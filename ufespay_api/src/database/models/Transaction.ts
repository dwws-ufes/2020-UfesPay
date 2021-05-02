import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import User from '../models/User';
import Comment from '../models/Comment';

@Entity('transaction')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  message: string;

  @Column()
  value: number;

  @Column()
  emitter_id: string;

  @ManyToOne(() => User, () => null)
  @JoinColumn({ name: 'emitter_id' })
  emitter: User;

  @Column()
  receiver_id: string;

  @ManyToOne(() => User, () => null)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({nullable: true})
  likes_id: string;

  @OneToMany(() => User, () => null)
  @JoinColumn({ name: 'likes_id' })
  likes: User[];

  @Column({nullable: true})
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
