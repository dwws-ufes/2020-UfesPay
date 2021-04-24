import { User } from './User';
import { Transaction } from './Transaction';
export declare class Comment {
    id: number;
    text: string;
    author: User;
    transaction: Transaction;
}
