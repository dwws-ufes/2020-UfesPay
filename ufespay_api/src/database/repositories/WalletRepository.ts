import Wallet from '../models/Wallet';
import { Repository, getRepository } from 'typeorm';
import { delay, registry } from 'tsyringe';

export interface IWalletRepository{
  create: () => Promise<Wallet>;
  findById: (id: string) => Promise<Wallet | undefined>;
  save: (wallet: Wallet) => Promise<Wallet>;
  delete: (id: string) => Promise<void>;
}

@registry([
  {
    token: "IWalletRepository",
    useToken: delay(() => WalletRepository)
  }
])
class WalletRepository implements IWalletRepository {
  private ormRepository: Repository<Wallet>;

  constructor() {
    this.ormRepository = getRepository(Wallet);
  }

  async create() {
    const newWallet = this.ormRepository.create({});
    await this.ormRepository.save(newWallet);
    return newWallet;
  }

  async findById(id: string) {
    const findWallet = await this.ormRepository.findOne({
      where: { id },
    });

    return findWallet || undefined;
  }

  async save(wallet: Wallet) {
    return this.ormRepository.save(wallet);
  }

  async delete(id: string) {
    await this.ormRepository.delete({ id });
  }
}

export default WalletRepository;