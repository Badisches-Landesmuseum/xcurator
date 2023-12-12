export {};

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string;
      roles?: string[];
    };
    refreshToken: string;
    accessToken: string;
    expires: number;
    provider: string;
  }
}
