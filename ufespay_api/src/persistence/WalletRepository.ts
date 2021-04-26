import { User } from '../domain/User';
import { Wallet } from '../domain/Wallet';

import { Injectable } from '@tsed/di';
import { EntityRepository, FindManyOptions, Repository  } from 'typeorm';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
    Create(newWallet: Partial<Wallet>) : Promise<Wallet> {
        return this.save(newWallet);
    }
}