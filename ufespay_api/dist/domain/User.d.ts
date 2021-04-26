import { Wallet } from './Wallet';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    wallet: Wallet;
    created_at: Date;
    updated_at: Date;
}
