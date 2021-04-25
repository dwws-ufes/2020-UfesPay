import { Inject, Service } from '@tsed/di';

import { User } from '../domain/User';

@Service()
export class UserService {
    //@Inject(UserRepository)
    //private readonly userRepo: UserRepository;

    //@Inject(WalletRepository)
    //private readonly walletRepo: WalletRepository;

    async CreateUser(user: Pick<User, 'name' | 'email' | 'password'>) {
      //throw new BadRequest('CPF inválido');
      
      // create user at repository
      /*const newUser = await this.dao.Create({
        ...user,
        password: User.GetEncryptedPassword(user.password),
        address: await this.addressService.CreateAddress(user.address),
        cpf,
      });*/
  
      return null;
    }

      async ListAllUsers() {
        //const users = await this.dao.ReadAll();
    
        //return Promise.all(users.map((user) => this.GetUserDTO(user)));
        return null;
    }

    async GetUserByEmail(email: string) {
        
        /*const [user] = await this.dao.ReadWith({
          where: { email },
        });*/
    
        return null;
    }

    async GetUserById(userId: string) {
        //const user = await this.dao.Read(userId);
    
        /*return {
          ...(await this.GetUserDTO(user)),
          cpf: User.GetFormmatedCpf(user.cpf),
        };*/
        return null;
      }

      

}
