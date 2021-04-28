import { Document, Model, model, Types, Schema } from 'mongoose';

export interface IWallet {
  balance: number;
}

export interface IWalletDocument extends IWallet, Document {}

export type IWalletModel =  Model<IWalletDocument>

const WalletSchema = new Schema<IWalletDocument, IWalletModel>({
  balance: { type: Number, default: 3000, required: true },
});

const Wallet = model('Wallet', WalletSchema);

export default Wallet;