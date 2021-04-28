import User, { IUserDocument } from '../models/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  walletId: string;
} 

export interface IUserRepository {
  create: (data: CreateUserDTO) => Promise<IUserDocument>;
  getOthers: (id: string) => Promise<IUserDocument[]>;
  findById: (id: string) => Promise<IUserDocument | null>;
  findByEmail: (email: string) => Promise<IUserDocument | null>;
  delete: (email: string) => Promise<void>;
  update: (id: string, newUserData: object) => Promise<IUserDocument | null>;
}

class UserRepository implements IUserRepository {
  async create({name, email, password, walletId}: CreateUserDTO) {
    const newUser = new User({ name, email, password, wallet: walletId });
    await newUser.save();
    return newUser;
  }
  
  async findByEmail(email: string) {
    const user = await User.findOne({ email: email }, 'id name email wallet password').populate('wallet').exec();
    return user;
  }

  async findById(id: string) {
    const user = await User.findById(id, 'id name email wallet password').populate('wallet').exec();
    return user;
  }

  async getOthers(id: string) {
    return User.find({ _id: { $ne: String(id) } }, 'name email');
  }

  async update(id: string, newUserData: object){
    const changedUser = await User.findByIdAndUpdate(
      id,
      newUserData,
    );

    if(!changedUser) return null;

    const updatedUser = await changedUser.save();

    return updatedUser;
  }

  async delete(email: string) {
    await User.deleteOne({ email });
  }

}

export default UserRepository;