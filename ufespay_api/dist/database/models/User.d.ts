import { Document, Model, Types } from 'mongoose';
import { IWalletDocument } from './Wallet';
export interface IUser {
    name: string;
    email: string;
    password: string;
    wallet: Types.ObjectId | Record<string, unknown>;
}
export interface IUserDocument extends IUser, Document {
    wallet: IWalletDocument["_id"];
}
export declare type IUserModel = Model<IUserDocument>;
declare const User: IUserModel;
export default User;
