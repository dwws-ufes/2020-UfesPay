import Wallet, { IWallet } from '../models/Wallet';

export interface IWalletRepository {
  create: () => Promise<IWallet>;
  findById: (id: string) => Promise<IWallet>;
  save: (wallet: IWallet) => Promise<IWallet>;
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

  async save(wallet: IWallet) {
    return wallet.save();
  }

  async delete(id: string) {
    await Wallet.deleteOne({ _id: id });
  }
}

export default WalletRepository;