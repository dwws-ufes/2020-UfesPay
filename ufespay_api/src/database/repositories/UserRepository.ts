import User from '../models/User';
import { Repository, getRepository, Not } from 'typeorm';
import Wallet from '../models/Wallet';

import { delay, registry } from 'tsyringe';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  country: string;
  wallet: Wallet;
} 

export interface IUserRepository {
  create: (data: CreateUserDTO) => Promise<User>;
  getOthers: (id: string) => Promise<User[]>;
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  delete: (email: string) => Promise<void>;
  update: (id: string, newUserData: object) => Promise<User | undefined>;
}

@registry([
  {
    token: "IUserRepository",
    useToken: delay(() => UserRepository)
  }
])
class UserRepository implements IUserRepository {
  ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({name, email, password, country, wallet}: CreateUserDTO) {
    const newUser = this.ormRepository.create({
      name,
      email,
      password,
      country,
      wallet,
    });
    await this.ormRepository.save(newUser);
    return newUser;
  }
  
  async findByEmail(email: string) {
    const findUser = await this.ormRepository.findOne({
      where: { email },
      join: {
        alias: "user",
        leftJoinAndSelect: {
            profile: "user.wallet",
        }
      }
    });

    return findUser || undefined;
  }

  async findById(id: string) {
    const findUser = await this.ormRepository.findOne({
      where: { id },
      join: {
        alias: "user",
        leftJoinAndSelect: {
            profile: "user.wallet",
        }
      }
    });

    return findUser || undefined;
  }

  async getOthers(id: string) {
    const findUsers = await this.ormRepository.find({
      where: { id: Not(id) },
      select: ['id', 'name', 'email'],
    });

    return findUsers || [];
  }

  async update(id: string, newUserData: object){
    const changedUser = await this.findById(id);

    if(!changedUser) return undefined;

    const updatedUser = {...changedUser, ...newUserData};
    
    return await this.ormRepository.save(updatedUser);
  }

  async delete(email: string) {
    await this.ormRepository.delete({ email });
  }

}

export default UserRepository;