import { Request, Response, NextFunction } from 'express';
declare function ensureAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default ensureAuth;
