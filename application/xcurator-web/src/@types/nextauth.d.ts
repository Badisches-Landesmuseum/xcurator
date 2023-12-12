import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    id_token: string;
    roles: string[];
    error: string;
    user: {
      uuid: string;
      email: string;
      roles: string[];
      firstName: string;
      lastName: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    expires_in: number;
    access_token: string;
    id_token: string;
    refresh_token: string;
    decoded: {
      realm_access: {
        roles: string[];
      };
    };
    error: string;
    user: {
      uuid: string;
      email: string;
      roles: string[];
      firstName: string;
      lastName: string;
    };
  }
}
