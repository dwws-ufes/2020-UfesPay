import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import User from '../models/User';
import Transaction from '../models/Transaction';

@Entity('comment')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  author_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(type => Transaction)
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
