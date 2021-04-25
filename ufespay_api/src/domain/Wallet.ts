
import {
  Property, Required, Minimum,
} from '@tsed/schema';

import {
  Column, Entity, PrimaryGeneratedColumn,JoinColumn,CreateDateColumn,
} from 'typeorm';

import { Transaction } from './Transaction';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: string;

  @Column({ type: 'float' })
  @Minimum(0)
  @Required()
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  //@OneToMany(() => Transaction, (transac) => transac.category)
  //transactions: Transaction[];
}
