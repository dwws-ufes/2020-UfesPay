import { User } from './User';
import { Comment } from './Comment';
export declare class Transaction {
    id: number;
    message: string;
    value: number;
    emitter: User;
    receiver: User;
    comments: Comment[];
    created_at: Date;
}
