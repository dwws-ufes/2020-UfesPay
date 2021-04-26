import { User } from './User';
import { Transaction } from './Transaction';
export declare class Comment {
    id: string;
    text: string;
    author: User;
    transaction: Transaction;
}
