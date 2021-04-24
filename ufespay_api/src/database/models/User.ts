import { Document, Model, model, Types, Schema } from 'mongoose';

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

export type IUserModel =  Model<IUserDocument>;

const UserSchema = new Schema<IUserDocument, IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  wallet: { type: Types.ObjectId, ref: 'Wallet', required: true },
});

const User = model('User', UserSchema);

export default User;