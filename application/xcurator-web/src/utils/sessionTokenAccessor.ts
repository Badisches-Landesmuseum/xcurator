import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { decrypt } from './encryption';

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    return decrypt(session.access_token);
  }
  return null;
}

export async function getIdToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    return decrypt(session.id_token);
  }
  return null;
}
