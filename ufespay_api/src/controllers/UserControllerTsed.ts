import { BodyParams, Controller, Delete, Get, HeaderParams, Inject, Post, Put, Request } from '@tsed/common';
import { BadRequest, NotFound } from '@tsed/exceptions';
import { Authorize } from '@tsed/passport';
import { EntityNotFoundError } from 'typeorm';
import {User} from '../domain/User'
import { UserService } from '../application/UserService';

@Controller('/userInject')
export class UserControllerTsed {
    @Inject(UserService)
    private userService: UserService;

    @Get('/list')
    async GetAll() {
      return this.userService.ListAllUsers();
    }

    @Post('/')
    async Post(@Request() request: Request, @BodyParams() user: Pick<User, 'name' | 'email' | 'password' >) {
        if (!user.name) throw new BadRequest('Required field name is empty');
        if (!user.email) throw new BadRequest('Required field email is empty');
        if (!user.password) throw new BadRequest('Required password name is empty');
        try {
            const newUser = await this.userService.CreateUser(user);
        } catch (e) {
          console.log(e);
          throw new BadRequest('Error trying to create user')
        }
      }    
}
