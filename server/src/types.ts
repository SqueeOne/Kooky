import { Session, SessionData } from "express-session";
import { Request, Response } from "express";
import Redis from "ioredis";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  redis: Redis;
  res: Response;
};
