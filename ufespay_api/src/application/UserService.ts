import { Inject, Service } from '@tsed/di';

import { User } from '../domain/User';
import { UserRepository } from '../persistence/UserRepository';

@Service()
export class UserService {
    @Inject(UserRepository)
    private readonly userRepo: UserRepository;

    //@Inject(WalletRepository)
    //private readonly walletRepo: WalletRepository;

    async CreateUser(user: Pick<User, 'name' | 'email' | 'password'>) {     
      // create user at repository
      /*const newUser = await this.dao.Create({
        ...user,
        password: User.GetEncryptedPassword(user.password),
        address: await this.addressService.CreateAddress(user.address),
        cpf,
      });*/

      const newUser =await this.userRepo.Create(user);
  
      return newUser;
    }

      async ListAllUsers() {
        const users = await this.userRepo.ReadAll();

        return users;
    }

    async GetUserByEmail(email: string) {
        const user = await this.userRepo.GetUserByEmail(email);
        return user;
    }

    async GetUserById(userId: string) {
        const user = await this.userRepo.GetUserById(userId);
        return user;
      }

      

}
