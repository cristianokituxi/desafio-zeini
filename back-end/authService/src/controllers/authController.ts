import { Request, Response } from 'express';
import { loginUser } from '../services/authservice';


export const login = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const { email, senha } = req.body;
    const { token, user } = await loginUser(email, senha);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
