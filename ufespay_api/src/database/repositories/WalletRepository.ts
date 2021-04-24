import Wallet, { IWalletDocument } from '../models/Wallet';

export interface IWalletRepository {
  create: () => Promise<IWalletDocument>;
  findById: (id: string) => Promise<IWalletDocument | null>;
  save: (wallet: IWalletDocument) => Promise<IWalletDocument>;
  delete: (id: string) => Promise<void>;
}

class WalletRepository implements IWalletRepository {
  async create() {
    const newWallet = new Wallet({});
    await newWallet.save();
    return newWallet;
  }

  async findById(id: string) {
    return Wallet.findById(id);
  }

  async save(wallet: IWalletDocument) {
    return wallet.save();
  }

  async delete(id: string) {
    await Wallet.deleteOne({ _id: id });
  }
}

export default WalletRepository;