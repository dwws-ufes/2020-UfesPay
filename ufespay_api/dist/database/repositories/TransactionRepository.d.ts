import { ITransactionDocument } from '../models/Transaction';
export interface ITransactionRepository {
    create: (data: object) => Promise<ITransactionDocument>;
    getAll: () => Promise<ITransactionDocument[]>;
    findById: (id: string) => Promise<ITransactionDocument | null>;
    save: (transaction: ITransactionDocument) => Promise<ITransactionDocument>;
    delete: (id: string) => Promise<void>;
}
declare class TransactionRepository implements ITransactionRepository {
    create(data: object): Promise<ITransactionDocument>;
    getAll(): Promise<ITransactionDocument[]>;
    findById(id: string): Promise<ITransactionDocument | null>;
    save(transaction: ITransactionDocument): Promise<ITransactionDocument>;
    delete(id: string): Promise<void>;
}
export default TransactionRepository;
