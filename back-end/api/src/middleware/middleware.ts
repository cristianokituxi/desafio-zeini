import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const AUTH_SERVICE_URL =process.env.AUTH_SERVICE_URL as string + '/auth/verify';

export const authMiddleware = async (req: Request | any , res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const unprotectedRoutes = ['/auth/login', '/usuario/add']; // Rotas desprotegidas
  // Verifica se a rota atual é uma das rotas desprotegidas
  if (unprotectedRoutes.includes(req.path)) {
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: 'Token nãoo fornecido' });
  }

  try {
    const authResponse = await axios.post(AUTH_SERVICE_URL, { token });
    console.log(authResponse);

    if (authResponse.data.message ===  'Token is valid') {
      req.user = authResponse.data.user;
      return next();
    } else {
      return res.status(401).json({ message: 'Token inválido' });
    }
  } catch (error: any) {
    console.error('Erro na validação do token:', error.message);
    return res.status(500).json({ message: 'Erro no serviço de autenticação' });
  }
};
