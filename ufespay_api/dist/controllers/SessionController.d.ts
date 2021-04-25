import { Request, Response } from 'express';
import { IUserRepository } from '../database/repositories/UserRepository';
export interface ISessionController {
    userRepository: IUserRepository;
    setDependencies: (userRepository: IUserRepository) => void;
    signIn: (req: Request, res: Response) => Promise<Response>;
    signOut: (req: Request, res: Response) => Promise<Response>;
}
declare class SessionController implements ISessionController {
    userRepository: IUserRepository;
    setDependencies(userRepository: IUserRepository): void;
    signIn(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signOut(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default SessionController;
