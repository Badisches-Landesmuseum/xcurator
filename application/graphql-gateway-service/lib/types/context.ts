import { Request, Response } from 'express';
import session from 'express-session';
import Redis, { Cluster } from 'ioredis';

export interface MyContext {
  req: Request & { session: session.Session & Partial<session.SessionData> };
  res: Response;
  redis: Cluster | Redis;
  token: string;
}
