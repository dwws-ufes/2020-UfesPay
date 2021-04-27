import { BodyParams, Controller, Delete, Get, Inject, Post,  Request, Put } from '@tsed/common';
import { BadRequest , NotFound} from '@tsed/exceptions';
import {User} from '../domain/User'
import { UserService } from '../application/UserService';
import {WalletService} from '../application/WalletService';

@Controller('/user')
export class UserControllerTsed {
    @Inject(UserService)
    private userService: UserService;

    @Inject(WalletService)
    private readonly walletService: WalletService;

    @Get('/getAll')
    async getAll() : Promise<User[]>{
      const users = await this.userService.ListAllUsers();

      if (users !=null)
        return users;
      else{
        throw new BadRequest('No user found'); 
      }
    }

    @Get()
    async index(@BodyParams() userId: string ) : Promise<User>{
      const user = await this.userService.GetUserById(userId);

      if (user !=null)
        return user;
      else{
        throw new BadRequest('No user found'); 
      }
    }

    // Change at front ed from /user to /user/users
    @Get('/users')
    async list(@BodyParams() userId: string ) : Promise<User[]>{
     
      const users = await this.userService.GetOthers(userId);

      if (users==null) {
        throw new NotFound('no other user found'); 
      }

      return users;
    }

    @Delete()
    async delete( @BodyParams() userId: string ) {
      try{
        const user = await this.userService.GetUserById(userId);

        if (!user) {
          throw new NotFound('user not found'); 
        }
        // delete wallet
        await this.walletService.Delete(user.wallet);

        // delete user
        await this.userService.Delete(user);

      }catch(err){
        console.log(err);
        throw new BadRequest('Could not delete user'); 
      }
    }

    @Post('/')
     async create(@Request() request: Request, @BodyParams() user: Pick<User, 'name' | 'email' | 'password' >) : Promise<User> {
        if (!user.name) throw new BadRequest('Required field name is empty');
        if (!user.email) throw new BadRequest('Required field email is empty');
        if (!user.password) throw new BadRequest('Required password name is empty');
         

        const existentUser = await this.userService.GetUserByEmail(user.email);

        if (existentUser!=null){
          throw new BadRequest('E-mail already in use.')
        } 
               
        const newUser = await this.userService.CreateUser(user);

        if (newUser!=null){
          return newUser;
        }
        else{
              throw new BadRequest('Could not create user'); 
          }
        }           

        @Put()
        async update(@Request('id') userId: string,
        @BodyParams('name') name: string,
        @BodyParams('email') email: string,
        @BodyParams('password') password: string,
        @BodyParams('newPassword') newPassword: string
        ) : Promise<User> {
                if (!name) throw new BadRequest('Required field name is empty');
                if (!email) throw new BadRequest('Required field email is empty');
                if (!password) throw new BadRequest('Required password is empty');
                if (!newPassword) throw new BadRequest('Required New Password is empty');
          
          const user = await this.userService.GetUserById(userId);

          if( user == null) {
            throw new BadRequest('Could not find user'); 
          }       

          if(newPassword && user.password !== password) {
            throw new BadRequest('Wrong Password'); 
          } 
    
          user.name = name;
          user.email = email;
          user.password = newPassword;

          await this.userService.Update(userId,user);
          
          return user;
        }
}
