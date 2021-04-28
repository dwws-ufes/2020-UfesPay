import { Inject, Service } from '@tsed/di';

import { User } from '../domain/User';
import { UserRepository } from '../persistence/UserRepository';
import { WalletService } from '../application/WalletService';

@Service()
export class UserService {
    @Inject(UserRepository)
    private readonly userRepo: UserRepository;

    @Inject(WalletService)
    private readonly walletService: WalletService;

    
    
    //async CreateUser(user: Pick<User, 'name' | 'email' | 'password'>) 
    async CreateUser(user: Partial<User>) {     

      const newWallet = await this.walletService.Create();
      user.wallet = newWallet;
      const newUser = await this.userRepo.Create(user);

      return newUser;
    }

      async ListAllUsers() {
        const users = await this.userRepo.ReadAll();

        return users;
    }

    async GetUserByEmail(email: string) {
        const user = await this.userRepo.GetByEmail(email);
        return user;
    }

    async GetUserById(userId: string) {
        const user = await this.userRepo.GetById(userId);
        return user;
      }

  async Delete(user: User) {
        await this.userRepo.Delete(user);
  }
   
 async GetOthers(userId: string) {
    return await this.userRepo.GetOthers(userId);
}
async Update(id: string, user: Partial<User>) {
  await this.userRepo.Update(id,user);
}
}
