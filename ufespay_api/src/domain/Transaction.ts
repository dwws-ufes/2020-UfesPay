import {
  Property, Required, Minimum,
} from '@tsed/schema';

import {
  Column, Entity, PrimaryGeneratedColumn,JoinColumn,CreateDateColumn,OneToMany,OneToOne,
} from 'typeorm';

import { User } from './User';
import { Comment } from './Comment';

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
  //@OneToMany(() => User, (ad) => ad.owner)
  //likes: User[];

  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  @OneToMany(() => Comment, (newComment) => newComment.transaction)
  comments: Comment[];
  
  //created_at: { type: Date, default: new Date() }
  @CreateDateColumn()
  created_at: Date;
}
