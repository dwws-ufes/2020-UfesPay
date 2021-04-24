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
  id: number;

  //text: { type: String, required: true },message: { type: String },
  @Column()
  @Required()
  text: string;

  //author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  @OneToOne(() => User)
  @Required()
  @JoinColumn()
  author: User;   

  //author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  @ManyToOne(() => Transaction, (transac) => transac.comments)
  @Required()
  transaction: Transaction;   
}
