import Cryptr from 'cryptr';

const secretKey = process.env.NEXTAUTH_SECRET || '';

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function encrypt(text: string) {
  const cryptr = new Cryptr(secretKey);

  return cryptr.encrypt(text);
}

export function decrypt(encryptedString: string) {
  const cryptr = new Cryptr(secretKey);

  return cryptr.decrypt(encryptedString);
}
