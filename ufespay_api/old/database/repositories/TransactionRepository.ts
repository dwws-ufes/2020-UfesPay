import Transaction, { ITransactionDocument } from '../models/Transaction';

export interface ITransactionRepository {
  create: (data: object) => Promise<ITransactionDocument>;
  getAll: () => Promise<ITransactionDocument[]>;
  findById: (id: string) => Promise<ITransactionDocument | null>;
  save: (transaction: ITransactionDocument) => Promise<ITransactionDocument>;
  delete: (id: string) => Promise<void>;
}

class TransactionRepository implements ITransactionRepository {
  async create(data: object) {
    const newTransaction = new Transaction(data);
    await newTransaction.save();
    return newTransaction;
  }

  async getAll() {
    const transaction = await Transaction.find({})
      .populate('emitter receiver', 'name email')
      .populate('comments')
      .populate({
        path : 'comments',
        populate : {
          path : 'author',
          select: 'name email'
        }
      })
      .exec();
    return transaction;
  }

  async findById(id: string) {
    return Transaction.findById(id).populate('likes');
  }

  async save(transaction: ITransactionDocument) {
    return transaction.save();
  }

  async delete(id: string) {
    await Transaction.deleteOne({ _id: id });
  }
}

export default TransactionRepository;