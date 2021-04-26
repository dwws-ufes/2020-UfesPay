import { User } from './User';
import { Comment } from './Comment';
export declare class Transaction {
    id: string;
    message: string;
    value: number;
    emitter: User;
    receiver: User;
    comments: Comment[];
    created_at: Date;
}
