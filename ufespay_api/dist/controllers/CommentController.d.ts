import { Request, Response } from 'express';
import { ICommentRepository } from '../database/repositories/CommentRepository';
import { ITransactionRepository } from '../database/repositories/TransactionRepository';
export interface ICommentController {
    transactionRepository: ITransactionRepository;
    commentRepository: ICommentRepository;
    setDependencies: (transactionRepository: ITransactionRepository, commentRepository: ICommentRepository) => void;
    create: (req: Request, res: Response) => Promise<Response>;
    delete: (req: Request, res: Response) => Promise<Response>;
}
declare class CommentController implements ICommentController {
    transactionRepository: ITransactionRepository;
    commentRepository: ICommentRepository;
    setDependencies(transactionRepository: ITransactionRepository, commentRepository: ICommentRepository): void;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default CommentController;
