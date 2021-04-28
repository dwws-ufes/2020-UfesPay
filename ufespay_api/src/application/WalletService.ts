import { Inject, Service } from '@tsed/di';

import { Wallet } from '../domain/Wallet';
import { User } from '../domain/User';
import { WalletRepository } from '../persistence/WalletRepository';

@Service()
export class WalletService {
    @Inject(WalletRepository)
    private readonly walletRepo: WalletRepository;

    async Create() : Promise<Wallet>{     
        const newWallet = await this.walletRepo.Create();
   
        return newWallet;
      }

      async Delete(wallet : Wallet  ) {     
        this.walletRepo.delete(wallet.id);
      }

      async GetWalletById(walletId : string  ) : Promise<Wallet | undefined> {     
        return this.walletRepo.GetById(walletId);
      }

      async UpdateWallet(id: string, wallet: Partial<Wallet>)  {     
        this.walletRepo.Update(id,wallet);
      }
}