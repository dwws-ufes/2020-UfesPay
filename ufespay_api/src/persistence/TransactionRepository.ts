import { Transaction } from '../domain/Transaction';

import { EntityRepository, FindManyOptions, Repository  } from 'typeorm';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {

 GetById(id: string) : Promise<Transaction | undefined> {
      return this.findOne({
        relations: ['emitter', 'receiver','likes', 'comments', 'wallet'],
        where: { id },
      });
    }

  async Update(id: string, transac: Partial<Transaction>) {
      this.update(id, transac);
  }
    

  /*
      Create(user: Partial<User>, userWallet : Wallet) : Promise<User> {
        user.wallet = userWallet;
        return this.save(user);
    }

    ReadAll() : Promise<User[]>{
       return this.find({
          relations: ['wallet'],
        });
    }

  async Delete(user : User) {
      await this.delete(user);
  }

  
  async Update(id: string, user: User) {
    this.update(id, user);
  }*/
  
}