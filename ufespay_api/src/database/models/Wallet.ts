import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wallet')
class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: 3000})
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Wallet;