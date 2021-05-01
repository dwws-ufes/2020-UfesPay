import User from '../models/User';
import { Repository, getRepository, Not, getConnectionManager, getConnection } from 'typeorm';
import Wallet from '../models/Wallet';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
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

class UserRepository implements IUserRepository {
  ormRepository: Repository<User>;

  constructor() {
    // this.ormRepository = getRepository<User>(User);
    this.ormRepository = getConnection('default').getRepository(User);
  }

  async create({name, email, password, wallet}: CreateUserDTO) {
    const newUser = this.ormRepository.create({
      name,
      email,
      password,
      wallet,
    });
    await this.ormRepository.save(newUser);
    return newUser;
  }
  
  async findByEmail(email: string) {
    // const user = await User.findOne({ email: email }, 'id name email wallet password').populate('wallet').exec();
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser || undefined;
  }

  async findById(id: string) {
    // const user = await User.findById(id, 'id name email wallet password').populate('wallet').exec();
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });

    return findUser || undefined;
  }

  async getOthers(id: string) {
    // return User.find({ _id: { $ne: String(id) } }, 'name email');
    const findUsers = await this.ormRepository.find({
      where: { id: Not(id) },
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