import { Inject, Service } from '@tsed/di';

import { Transaction } from '../domain/Transaction';
import { TransactionRepository } from '../persistence/TransactionRepository';

@Service()
export class TransactionService {
    @Inject(TransactionRepository)
    private readonly transacRepo: TransactionRepository;

  async GetTransactionById(transacId: string) {
    const transac = await this.transacRepo.GetById(transacId);
    return transac;
  }

  async UpdateTransaction(id: string, transac: Partial<Transaction>) {
    await this.transacRepo.Update(id,transac);
  }
}
