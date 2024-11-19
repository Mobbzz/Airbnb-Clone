import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  userData?: JwtPayload & { _id: string; userId?: string; email: string; displayName: string };
}
