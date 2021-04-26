import {
  Email, Maximum, MinLength, Property, Required, 
} from '@tsed/schema';

import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn,JoinColumn, CreateDateColumn,UpdateDateColumn,
} from 'typeorm';

import { Wallet } from './Wallet';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Property()
  id: string;

  @Column()
  @Maximum(40)
  @Required()
  name: string;

  @Column({ unique: true })
  @Email()
  @Required()
  email: string;

  @Column()
  @Maximum(100)
  @MinLength(8)
  @Required()
  password: string;

  /*@OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet; */

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}