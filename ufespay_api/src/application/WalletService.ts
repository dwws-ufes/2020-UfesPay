import { Inject, Service } from '@tsed/di';

import { Wallet } from '../domain/Wallet';
import { WalletRepository } from '../persistence/WalletRepository';

@Service()
export class WalletService {
    @Inject(WalletRepository)
    private readonly walletRepo: WalletRepository;

    async Create(wallet: Wallet) {     
        const newWallet =await this.walletRepo.Create(wallet);
    
        return newWallet;
      }
}