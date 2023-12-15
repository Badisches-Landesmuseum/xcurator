import { Server } from 'http';
import WebSocket from 'ws';
import { authClient } from './authClient';
import { AuthResponse } from './auth-schema';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import { RedisStore } from 'connect-redis';
import { Session, SessionData } from 'express-session';
import { COOKIE_NAME } from './constants';

export const connections = new Map<string, WebSocket.WebSocket>();
export const logoutMsg = JSON.stringify({ cmd: 'logout' });

export function createWebsocket(httpServer: Server, redisStore: RedisStore) {
  const wss = new WebSocket.Server({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    console.log('Parsing session from request...');

    const cookies = cookie.parse(request.headers.cookie || '');

    const sid = cookieParser.signedCookie(
      cookies[COOKIE_NAME],
      process.env.SESSION_SECRET!
    );

    redisStore.get(sid + '', (err, session) => {
      if (session && !session.user?.id) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
      console.log('Session is parsed!');
      wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, session);
      });
    });
  });

  wss.on('connection', (ws, session: Session & Partial<SessionData>) => {
    if (!session) {
      console.log('[Error]: [WS] No session!');
      return { error: new Error('No session!') };
    }

    const userId = session.user?.id;
    if (!userId) {
      console.log('[Error]: [WS] No user id in session');
      return { error: new Error('No user id in session') };
    }
    connections.set(userId, ws);

    ws.on('message', message => {
      console.log(`[WS] message: ${message} from user: ${userId}`);
      try {
        const msg = message.toString();
        switch (msg) {
          case 'ping': {
            const refreshToken = session.refreshToken;
            const expires = session.expires;
            const provider = session.provider || 'keycloak';

            if (!refreshToken) throw new Error('No refresh token in session!');
            if (!expires) throw new Error('No expires value in session!');

            const secondsUntilExpiry = expires - Date.now();
            const isExpired = secondsUntilExpiry < 0;

            if (isExpired) {
              console.log('[WS] Token is expired. Refreshing token...');
              authClient<AuthResponse>(
                'token',
                {
                  refresh_token: refreshToken,
                  grant_type: 'refresh_token',
                },
                provider
              )
                .then(data => {
                  // TODO verify access token
                  if (!data.success || !data.token) {
                    console.log(
                      '[WS] Tried to refresh token but response was not successful ',
                      data
                    );
                    logout(ws, refreshToken);
                  } else {
                    session.refreshToken = data.token!.refresh_token;
                    session.accessToken = data.token!.access_token;
                    session.expires = data.token!.expires_in * 1000;

                    ws.send('pong');
                  }
                })
                .catch(error => {
                  console.log('Could not refresh token. Logout user.', {
                    userId,
                    error,
                  });
                  logout(ws, refreshToken);
                });
            } else {
              ws.send('pong');
            }
            break;
          }
          default:
            console.log('[WS] Unknown message:', msg);
            break;
        }
      } catch (error) {
        console.error(
          '[Error]: [WS] Could not parse message:',
          message.toString()
        );
      }
    });

    ws.on('close', () => {
      console.log('[WS] closed');
      connections.delete(userId);
    });

    function logout(ws: WebSocket.WebSocket, refreshToken: string) {
      const provider = session.provider || 'keycloak';
      redisStore.destroy(session.id, err => {
        if (err) {
          console.log('Could not destroy redis user session', err);
        }
        if (ws) {
          ws.send('not pong');
          ws.close();
        }
        authClient(
          'logout',
          {
            refresh_token: refreshToken,
          },
          provider
        );
      });
    }
  });

  return wss;
}
