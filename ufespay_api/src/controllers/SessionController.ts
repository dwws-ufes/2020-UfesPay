import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { IUserRepository } from '../database/repositories/UserRepository';
import { inject, injectable } from 'tsyringe';

export interface ISessionController {
  signIn: (req: Request, res: Response) => Promise<Response>;
  signOut: (req: Request, res: Response) => Promise<Response>;
}

@injectable()
class SessionController implements ISessionController{

  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository
  ) { }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findByEmail(email);

      if(!user) {
        return res.status(400).json({ message: 'Invalid email!' });
      }

      if(password !== user.password) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      
      const id = user.id;

      const token = jwt.sign({ id }, process.env.SECRET || 'default', {
        expiresIn: 20 * 60,
      });

      return res.status(200).json({ token, user });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async signOut(req: Request, res: Response) {
    return res.status(200).json({ token: null });
  }
}

export default SessionController;