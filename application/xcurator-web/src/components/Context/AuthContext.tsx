import * as React from 'react';
import { env } from 'next-runtime-env';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import {
  useAuthenticateBlmMutation,
  useAuthenticateMutation,
  useLogoutMutation,
  useMeLazyQuery,
} from 'src/graphql/_generated/types';

const AuthContext = React.createContext<{
  authenticate: () => void;
  unAuthenticate: () => void;
  isLoggedIn: boolean;
  userId: string;
  username: string;
  loading: boolean;
  admin: boolean;
} | null>(null);

const host = env('NEXT_PUBLIC_HOST') !== 'BLM' ? 'keycloak' : 'BLM';
const SOCKET = env('NEXT_PUBLIC_GATEWAY_API_SOCKET') || '';
const BLM_LOGOUT_PAGE =
  env('NEXT_PUBLIC_BLM_ISSUER') +
  '/logout?client_id=' +
  env('NEXT_PUBLIC_BLM_CLIENT_ID');

async function authenticate() {
  await signIn(host).catch(err =>
    console.log('Error signing in on server side ', err)
  );
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [me] = useMeLazyQuery();
  const [authenticateBLM] = useAuthenticateBlmMutation();
  const [authenticateAP] = useAuthenticateMutation();
  const [logout] = useLogoutMutation();
  const session = useSession();
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [userId, setUserId] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [admin, setAdmin] = React.useState(false);

  const unAuthenticate = React.useCallback(() => {
    logout().then(async () => {
      await signOut({
        callbackUrl: host === 'BLM' ? BLM_LOGOUT_PAGE : '/canvas',
      })
        .then(() => console.log('logged out.'))
        .catch(err => console.error('Error signing out on server side ', err));
      document.cookie =
        'connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    });
  }, [logout]);

  const authenticateIDP = React.useCallback(
    async (session: Session) => {
      let authenticateResponse;
      if (host === 'BLM') {
        const res = await authenticateBLM({
          variables: {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_in: session.expires_in,
            blmUser: session.user,
          },
        });
        if (res.errors) {
          throw new Error('Error logging in with BLM ', res.errors[0]);
        }
        authenticateResponse = res.data?.authenticateBLM;
      } else {
        const res = await authenticateAP({
          variables: {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_in: session.expires_in,
          },
        });
        if (res.errors) {
          throw new Error('Error logging in with AP ', res.errors[0]);
        }
        authenticateResponse = res.data?.authenticate;
      }
      return authenticateResponse;
    },
    [authenticateAP, authenticateBLM]
  );

  const syncWithGateway = React.useCallback(
    async (session: Session) => {
      // me query for checking if we have a session in the gateway
      const { data } = await me({ fetchPolicy: 'network-only' });
      // if session in gateway is still valid just refresh userId
      if (data?.me?.name) {
        setLoggedIn(true);
        setUserId(data.me.sub);
        setUsername(data.me.preferred_username || '');
        if (data.me.roles?.includes('ADMIN')) {
          setAdmin(true);
        }
      } else {
        // we don't have a session and need to authenticate at IDP again
        const response = await authenticateIDP(session).catch(err => {
          console.error('error ', err);
        });
        if (
          response &&
          !response.error?.error_description.includes('jwt') &&
          response.user
        ) {
          // start new session
          me({ fetchPolicy: 'network-only' }).then(response => {
            if (response.data?.me?.name) {
              setLoggedIn(true);
              setUserId(response.data.me.sub);
              setUsername(response.data.me.preferred_username || '');

              if (response.data?.me?.roles?.includes('ADMIN')) {
                setAdmin(true);
              }
            }
          });
        } else {
          setLoggedIn(false);
          setUserId('');
          setUsername('');
          setAdmin(false);
          unAuthenticate();
        }
      }
    },
    [me, authenticateIDP, unAuthenticate]
  );

  React.useEffect(() => {
    if (session.status === 'authenticated' && !isLoggedIn) {
      syncWithGateway(session.data);
    }
  }, [session, session.status, syncWithGateway]);

  React.useEffect(() => {
    if (isLoggedIn) {
      const socket = new WebSocket(SOCKET);
      socket.addEventListener('open', () => {
        try {
          socket.send('ping');
          setInterval(() => {
            socket.send('ping');
          }, 300000);
        } catch (err) {
          console.error('Error sending ping ', err);
        }
      });

      socket.addEventListener('message', async event => {
        if (event.data !== 'pong') {
          setLoggedIn(false);
          socket.close();
          unAuthenticate();
        }
      });

      return () => {
        socket.close();
      };
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        isLoggedIn,
        unAuthenticate,
        userId,
        username,
        loading:
          session.status === 'loading' ||
          (session.status === 'authenticated' && !isLoggedIn),
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }
  return context;
}
