import { Document, Model, Types } from 'mongoose';
import { IUserDocument } from './User';
import { ICommentDocument } from './Comment';
export interface ITransaction {
    message?: string;
    value: number;
    emitter: Types.ObjectId | Record<string, unknown>;
    receiver: Types.ObjectId | Record<string, unknown>;
    likes?: Types.ObjectId[] | Record<string, unknown>[];
    comments?: Types.ObjectId[] | Record<string, unknown>[];
    created_at?: Date;
}
export interface ITransactionDocument extends ITransaction, Document {
    emitter: IUserDocument["_id"];
    receiver: IUserDocument["_id"];
    likes?: IUserDocument["_id"][];
    comments?: ICommentDocument["_id"][];
}
export declare type ITransactionModel = Model<ITransactionDocument>;
declare const Transaction: ITransactionModel;
export default Transaction;
