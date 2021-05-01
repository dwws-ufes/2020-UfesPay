import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import User from '../models/User';
import Comment from '../models/Comment';

@Entity('transaction')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  value: number;

  @Column()
  emitter_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'emitter_id' })
  emitter: User;

  @Column()
  receiver_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column()
  likes_id: string;

  @OneToMany(() => User, () => null)
  @JoinColumn({ name: 'likes_id' })
  likes: User[];

  @Column()
  comments_id: string;

  @OneToMany(() => Comment, () => null)
  @JoinColumn({ name: 'comments_id' })
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
