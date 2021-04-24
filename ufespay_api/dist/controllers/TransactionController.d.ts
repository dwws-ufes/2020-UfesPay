import { Request, Response } from 'express';
import { IUserRepository } from '../database/repositories/UserRepository';
import { IWalletRepository } from '../database/repositories/WalletRepository';
import { ITransactionRepository } from '../database/repositories/TransactionRepository';
export interface ITransactionController {
    transactionRepository: ITransactionRepository;
    userRepository: IUserRepository;
    walletRepository: IWalletRepository;
    setDependencies: (transactionRepository: ITransactionRepository, userRepository: IUserRepository, walletRepository: IWalletRepository) => void;
    create: (req: Request, res: Response) => Promise<Response>;
    list: (req: Request, res: Response) => Promise<Response>;
    toggleLike: (req: Request, res: Response) => Promise<Response>;
}
declare class TransactionController implements ITransactionController {
    transactionRepository: ITransactionRepository;
    userRepository: IUserRepository;
    walletRepository: IWalletRepository;
    setDependencies(transactionRepository: ITransactionRepository, userRepository: IUserRepository, walletRepository: IWalletRepository): void;
    list(req: Request, res: Response): Promise<any>;
    create(req: Request, res: Response): Promise<any>;
    toggleLike(req: Request, res: Response): Promise<any>;
}
export default TransactionController;
