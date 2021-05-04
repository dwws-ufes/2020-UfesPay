import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type decodedType = {id: string};

function ensureAuth(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'JWT token is missing.' });
  }

  const [, token] = authHeader.split(' ');
    
  jwt.verify(token, process.env.SECRET || 'default', (err, decoded) => {
    if (err || !decoded) return res.status(500).json({ message: 'Invalid token.' });
  
    req.userId = (decoded as decodedType).id ;
    next();
  });
}

export default ensureAuth;
