import { IWalletDocument } from '../models/Wallet';
export interface IWalletRepository {
    create: () => Promise<IWalletDocument>;
    findById: (id: string) => Promise<IWalletDocument | null>;
    save: (wallet: IWalletDocument) => Promise<IWalletDocument>;
    delete: (id: string) => Promise<void>;
}
declare class WalletRepository implements IWalletRepository {
    create(): Promise<IWalletDocument>;
    findById(id: string): Promise<IWalletDocument | null>;
    save(wallet: IWalletDocument): Promise<IWalletDocument>;
    delete(id: string): Promise<void>;
}
export default WalletRepository;
