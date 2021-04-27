import {
  Property, Required, Minimum,
} from '@tsed/schema';

import {
  Column, Entity, PrimaryGeneratedColumn,JoinColumn,CreateDateColumn,OneToMany,OneToOne,ManyToMany, JoinTable,ManyToOne,
} from 'typeorm';

import { User } from './User';
import { Comment } from './Comment';
import { Wallet } from './Wallet';


@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: string;

  //message: { type: String },
  @Column()
  @Required()
  message: string;


  //value: { type: Number },
  @Column({ type: 'float' })
  @Minimum(0)
  @Required()
  value: number;

  //emitter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  @OneToOne(() => User)
  @JoinColumn()
  emitter: User; 

  
  //receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  @OneToOne(() => User)
  @JoinColumn()
  receiver: User; 

  
  //likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  @OneToMany(() => Comment, (newComment) => newComment.transaction)
  comments: Comment[];

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet: Wallet;
  
  //created_at: { type: Date, default: new Date() }
  @CreateDateColumn()
  created_at: Date;
}
