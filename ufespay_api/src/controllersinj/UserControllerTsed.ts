import { BodyParams, Controller, Get, Inject, Post,  Request } from '@tsed/common';
import { BadRequest , NotFound} from '@tsed/exceptions';
import {User} from '../domain/User'
import { UserService } from '../application/UserService';
import {Returns} from "@tsed/schema";

@Controller('/user')
export class UserControllerTsed {
    @Inject(UserService)
    private userService: UserService;

    @Get()
    @Returns(200, Array).Of(User)
    async GetAll() : Promise<User[]>{
      const users = await this.userService.ListAllUsers();

      if (users !=null)
        return users;
      else{
        throw new BadRequest('No user found'); 
      }
    }

    @Post('/')
    @Returns(200,User)
    async Post(@Request() request: Request, @BodyParams() user: Pick<User, 'name' | 'email' | 'password' >) : Promise<User> {
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
}
