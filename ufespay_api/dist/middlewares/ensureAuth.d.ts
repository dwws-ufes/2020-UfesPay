import { Request, Response, NextFunction } from 'express';
declare function ensureAuth(req: Request, res: Response, next: NextFunction): any;
export default ensureAuth;
