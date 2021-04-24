import { Request, Response } from 'express';
import { IUserRepository } from '../database/repositories/UserRepository';
import { IWalletRepository } from '../database/repositories/WalletRepository';
export interface IUserController {
    userRepository: IUserRepository;
    walletRepository: IWalletRepository;
    setDependencies: (userRepository: IUserRepository, walletRepository: IWalletRepository) => void;
    create: (req: Request, res: Response) => Promise<Response>;
    delete: (req: Request, res: Response) => Promise<Response>;
    update: (req: Request, res: Response) => Promise<Response>;
    index: (req: Request, res: Response) => Promise<Response>;
    list: (req: Request, res: Response) => Promise<Response>;
}
declare class UserController implements IUserController {
    userRepository: IUserRepository;
    walletRepository: IWalletRepository;
    setDependencies(userRepository: IUserRepository, walletRepository: IWalletRepository): void;
    create(req: Request, res: Response): Promise<any>;
    index(req: Request, res: Response): Promise<any>;
    list(req: Request, res: Response): Promise<any>;
    update(req: Request, res: Response): Promise<any>;
    delete(req: Request, res: Response): Promise<any>;
}
export default UserController;
