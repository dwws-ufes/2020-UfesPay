import { User } from './User';
import { Comment } from './Comment';
import { Wallet } from './Wallet';
export declare class Transaction {
    id: string;
    message: string;
    value: number;
    emitter: User;
    receiver: User;
    likes: User[];
    comments: Comment[];
    wallet: Wallet;
    created_at: Date;
}
