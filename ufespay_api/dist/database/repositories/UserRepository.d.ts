import { IUserDocument } from '../models/User';
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
declare class UserRepository implements IUserRepository {
    create({ name, email, password, walletId }: CreateUserDTO): Promise<IUserDocument>;
    findByEmail(email: string): Promise<IUserDocument | null>;
    findById(id: string): Promise<IUserDocument | null>;
    getOthers(id: string): Promise<IUserDocument[]>;
    update(id: string, newUserData: object): Promise<IUserDocument | null>;
    delete(email: string): Promise<void>;
}
export default UserRepository;
