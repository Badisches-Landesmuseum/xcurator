import Cryptr from 'cryptr';
import { env } from 'next-runtime-env';

const secretKey = env('NEXTAUTH_SECRET') || '';
export function encrypt(text: string) {
  const cryptr = new Cryptr(secretKey);

  return cryptr.encrypt(text);
}

export function decrypt(encryptedString: string) {
  const cryptr = new Cryptr(secretKey);

  return cryptr.decrypt(encryptedString);
}
