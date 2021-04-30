import jwt from 'jsonwebtoken';
import { BodyParams, Controller, Delete, Get, Inject, Post, Request, Response  } from '@tsed/common';
import { UserService } from '../application/UserService';
import {User} from '../domain/User';
import { BadRequest } from '@tsed/exceptions';

@Controller('/session')
export class SessionController {
  @Inject(UserService)
  private userService: UserService;

  @Post('/sign-in')
  async signIn(@Request() request: Request,
  @BodyParams('email') email: string,
  @BodyParams('password') password: string
  ) {
    try {
      const user = await this.tryLoginUser(email,password);
      if (user!=undefined){
      const id = user.id;

      const token = jwt.sign({ id }, process.env.SECRET || 'default', {
        expiresIn: 20 * 60,
      });
      return { token, user };
    }else{
        return { token: null };
    }
    }
    catch (e) {
      console.log(e);
      throw new BadRequest(e, 'error trying to login');
    }
  }

  @Delete('/sign-out')
  async signOut(@Request() request: Request,@Response() response : Response) {
    return { token: null };
  }

  private async tryLoginUser( email : string , password : string) : Promise<User | undefined> {
    const user = await this.userService.GetUserByEmail(email);

    if (!user) {
      return undefined; 
    }

    if (!user.verifyPassword(password)) {
      return undefined; 
    }

    return user;
  }
}


