import {
  Property, Required, 
} from '@tsed/schema';

import {
  Column, Entity, PrimaryGeneratedColumn,JoinColumn,ManyToOne,OneToOne,
} from 'typeorm';

import { User } from './User';
import { Transaction } from './Transaction';


@Entity()
export class Comment{
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: string;

  @Column()
  @Required()
  text: string;

  @OneToOne(() => User)
  @Required()
  @JoinColumn()
  author: User;   

  @ManyToOne(() => Transaction, (transac) => transac.comments)
  @Required()
  transaction: Transaction;   
}
