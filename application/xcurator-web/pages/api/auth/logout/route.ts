import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]';
import { getIdToken } from 'src/utils/sessionTokenAccessor';
import { env } from 'next-runtime-env';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const idToken = await getIdToken();
    const NEXTAUTH_URL = env('NEXTAUTH_URL') || '';

    console.log('logout');

    const url = `${env(
      'END_SESSION_URL'
    )}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
      NEXTAUTH_URL
    )}`;

    try {
      await fetch(url, { method: 'GET' });
    } catch (err) {
      console.error(err);
      return new Error('Error logging out');
    }
  }

  return new Response(null, { status: 302, headers: { Location: '/' } });
}
