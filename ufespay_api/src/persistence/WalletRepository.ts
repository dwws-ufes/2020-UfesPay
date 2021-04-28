import { User } from '../domain/User';
import { Wallet } from '../domain/Wallet';

import { Injectable } from '@tsed/di';
import { EntityRepository, FindManyOptions, Repository  } from 'typeorm';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
    Create() : Promise<Wallet> {
        const newWallet = new Wallet();
        newWallet.balance = 0;
        return this.save(newWallet);
    }

    async Delete(id: string) {
        await this.delete(id);
    }

    GetById(id: string) : Promise<Wallet | undefined> {
      return this.findOne({
        relations: ['transactions'],
        where: { id },
      });
    }

   async Update(id: string, wallet: Partial<Wallet>) {
    await this.update(id, wallet);
  }

}