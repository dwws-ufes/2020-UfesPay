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

  ReadAll() : Promise<Transaction[]>{
    return this.find({
       relations: ['emitter','receiver','likes','comments','wallet'],
     });
 }

 Create(transac: Partial<Transaction>) : Promise<Transaction> {
  return this.save(transac);
}
  
}