import { Repository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

export interface ITransactionRepository {
  create: (data: object) => Promise<Transaction>;
  getAll: () => Promise<Transaction[]>;
  findById: (id: string) => Promise<Transaction | undefined>;
  save: (transaction: Transaction) => Promise<Transaction>;
  delete: (id: string) => Promise<void>;
}

class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  async create(data: object) {
    const newTransaction = this.ormRepository.create(data);
    await this.ormRepository.save(newTransaction);
    return newTransaction;
  }

  async getAll() {

    const transactions = await this.ormRepository.find({
      join: {
        alias: "transaction",
        leftJoinAndSelect: {
            comments: "transaction.comments",
            author: "comments.author",
            emitter: "transaction.emitter",
            receiver: "transaction.receiver"
        }
      }
    });

    return transactions || [];
  }

  async findById(id: string) {
    const findTransaction = await this.ormRepository.findOne({
      where: { id }
    });

    return findTransaction || undefined;
  }

  async save(transaction: Transaction) {
    return this.ormRepository.save(transaction);
  }

  async delete(id: string) {
    await this.ormRepository.delete({ id });
  }
}

export default TransactionRepository;