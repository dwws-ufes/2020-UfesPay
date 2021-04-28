import { Request, Response } from 'express';

import { ICommentRepository } from '../database/repositories/CommentRepository';
import { ITransactionRepository } from '../database/repositories/TransactionRepository';

export interface ICommentController {
  transactionRepository: ITransactionRepository;
  commentRepository: ICommentRepository;
  setDependencies: (
    transactionRepository: ITransactionRepository,
    commentRepository: ICommentRepository,
  ) => void;
  create: (req: Request, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
}

class CommentController implements ICommentController {
  transactionRepository: ITransactionRepository;
  commentRepository: ICommentRepository;

  setDependencies(
    transactionRepository: ITransactionRepository,
    commentRepository: ICommentRepository,
  ){
    this.transactionRepository = transactionRepository;
    this.commentRepository = commentRepository;
  }

  async create(req: Request, res: Response) {
    try {
      const { text, transactionId } = req.body;
      const { userId } = req;

      const transaction = await this.transactionRepository.findById(transactionId);
  
      if (!transaction) {
        return res.status(400).json({ message: 'Invalid transaction'});
      }

      const comment = await this.commentRepository.create({text, author: userId});
  
      transaction?.comments?.push(comment);
      await this.transactionRepository.save(transaction);
  
      return res.status(200).json({ comment });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
   
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { id } = req.query;
      
      const comment = await this.commentRepository.findById(id as string);

      if (!comment) {
        return res.status(400).json({ message: 'Comment not found.'});
      }

      if (userId !== String(comment.author)) {
        return res.status(400).json({ message: 'You cannot delete this comment.'});
      }

      await this.commentRepository.delete(id as string);

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }
}

export default CommentController;