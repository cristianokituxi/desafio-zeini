import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: { id: string; role: string; email: string };
}
export const authenticate: (req: CustomRequest, res: Response, next: NextFunction) => void = (req, res, next) => {
 const SECRET = process.env.JWT_SECRET as string
  const token = req.body.token;
  console.log(token,'tou mo autenticator')
  

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log(decoded, 'tou mo autenticator');
    
    // Verificar se `decoded` é do tipo `JwtPayload` e possui as propriedades esperadas
    if (typeof decoded !== 'string' && 'id' in decoded && 'iat' in decoded && 'exp' in decoded) {
      return res.status(200).json({ message: 'Token is valid', user: decoded });
    } else {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};
