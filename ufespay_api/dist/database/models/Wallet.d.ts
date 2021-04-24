import { Document, Model } from 'mongoose';
export interface IWallet {
    balance: number;
}
export interface IWalletDocument extends IWallet, Document {
}
export declare type IWalletModel = Model<IWalletDocument>;
declare const Wallet: IWalletModel;
export default Wallet;
