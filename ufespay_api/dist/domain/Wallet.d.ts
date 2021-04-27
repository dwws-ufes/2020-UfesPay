import { Transaction } from './Transaction';
export declare class Wallet {
    id: string;
    balance: number;
    created_at: Date;
    transactions: Transaction[];
}
