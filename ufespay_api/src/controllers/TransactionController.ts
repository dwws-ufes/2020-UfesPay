import { Request, Response } from 'express';

import { IUserRepository } from '../database/repositories/UserRepository';
import { IWalletRepository } from '../database/repositories/WalletRepository';
import { ITransactionRepository } from '../database/repositories/TransactionRepository';

import { inject, injectable } from 'tsyringe';

export interface ITransactionController {
  create: (req: Request, res: Response) => Promise<Response>;
  list: (req: Request, res: Response) => Promise<Response>;
  toggleLike: (req: Request, res: Response) => Promise<Response>;
}

@injectable()
class TransactionController implements ITransactionController {

  constructor(
    @inject('ITransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('IUserRepository')
    private userRepository: IUserRepository,

    @inject('IWalletRepository')
    private walletRepository: IWalletRepository
  ) { }

  async list(req: Request, res: Response) {

    try {
      const transactions = await this.transactionRepository.getAll();

      return res.status(200).json({ transactions });
      
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async create(req: Request, res: Response) {
    try {

      const { receiverId, value, message } = req.body;
      const { userId } = req;

      // check if email already exist
      const emitter = await this.userRepository.findById(userId);
      const receiver = await this.userRepository.findById(receiverId);

      if (!emitter || !receiver) {
        return res.status(400).json({ message: 'Users not found.'});
      }

      const emitterWallet = await this.walletRepository.findById(emitter.wallet.id);
      const receiverWallet = await this.walletRepository.findById(receiver.wallet.id);

      if (!emitterWallet || !receiverWallet) {
        return res.status(400).json({ message: 'Users not found.'});
      }

      if (emitterWallet.balance < value) {
        return res.status(400).json({ message: 'Not enought money'});
      }

      const transaction = await this.transactionRepository.create({
        message,
        emitter,
        receiver,
        value,
        likes: [],
        comments: [],
        created_at: new Date(),
      });

      emitterWallet.balance = emitterWallet.balance - value;

      await this.walletRepository.save(emitterWallet);

      receiverWallet.balance += eval(value);
      await  this.walletRepository.save(receiverWallet);

      return res.status(200).json({ transaction });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async toggleLike(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { transactionId } = req.body;

      const transaction = await this.transactionRepository.findById(transactionId);

      if (!transaction) {
        return res.status(400).json({ message: 'Transaction not found.'});
      }

      const alreadyLiked = transaction.likes.find(
        likeAuthorId => String(likeAuthorId) === String(userId)
      );

      if (alreadyLiked) {
        transaction.likes = transaction.likes.filter(
          likeAuthorId => String(likeAuthorId) !== String(userId)
        );
        await this.transactionRepository.save(transaction);
        return res.status(200).send();
      }

      transaction.likes.push(userId);
      await this.transactionRepository.save(transaction);

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
    
  }

}

export default TransactionController;