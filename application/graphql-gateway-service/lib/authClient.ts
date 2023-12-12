import fetch from 'node-fetch';
import {
  AUTH_HOST,
  BLM_AUTH_HOST,
  BLM_CLIENT_ID,
  BLM_CLIENT_SECRET,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  AUTH_REALM,
} from './constants';

export async function authClient<T>(
  endpoint: string,
  data: Record<string, string>,
  provider: string
): Promise<T> {
  return new Promise((resolve, reject) => {
    let authPoint: string;
    let clientId: string;
    let clientSecret: string;
    if (provider === 'BLM') {
      authPoint = `${BLM_AUTH_HOST}/${endpoint}`;
      clientId = BLM_CLIENT_ID;
      clientSecret = BLM_CLIENT_SECRET;
    } else {
      authPoint = `${AUTH_HOST}/auth/realms/${AUTH_REALM}/protocol/openid-connect/${endpoint}`;
      clientId = KEYCLOAK_CLIENT_ID;
      clientSecret = KEYCLOAK_CLIENT_SECRET;
    }

    fetch(authPoint, {
      method: 'POST',
      body: new URLSearchParams({
        ...data,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(async resp => {
        const isJson = resp.headers
          .get('content-type')
          ?.includes('application/json');

        const data = isJson ? await resp.json() : await resp.text();

        // Modify response to include status ok, success, and status text
        const response = {
          success: resp.ok,
          status: resp.status,
          statusText: resp.ok ? resp.statusText : data.error || '',
          token: resp.ok ? data : undefined,
          error: resp.ok ? undefined : data,
        };
        // If request failed, reject and return modified json string as error
        if (!response.success) {
          return Promise.reject(JSON.stringify(response));
        }
        // If successful, continue by returning modified json string
        return JSON.stringify(response);
      })
      .then(response => JSON.parse(response))
      .then(json => resolve(json))
      .catch(error => {
        try {
          reject(JSON.parse(error));
        } catch (e) {
          reject(error);
        }
      });
  });
}
