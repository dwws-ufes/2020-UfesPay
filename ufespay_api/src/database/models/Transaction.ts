import { Document, Model, model, Types, Schema } from 'mongoose';

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
  likes?:  IUserDocument["_id"][];
  comments?:  ICommentDocument["_id"][];
}

export type ITransactionModel =  Model<ITransactionDocument>;

const TransactionSchema = new Schema<ITransactionDocument, ITransactionModel>({
  message: { type: String },
  value: { type: Number, required: true },
  emitter: { type: Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  comments: [{ type: Types.ObjectId, ref: 'Comment' }],
  created_at: { type: Date, default: new Date() },
});

const Transaction = model('Transaction', TransactionSchema);

export default Transaction;