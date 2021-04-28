import {Req, Inject} from "@tsed/common";
import {Arg, OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {BasicStrategy} from "passport-http";
import {UserService} from "../application/UserService";
import jwt from 'jsonwebtoken';

@Protocol({
  name: "basic",
  useStrategy: BasicStrategy,
  settings: {}
})
export class BasicProtocol implements OnVerify  {
    @Inject(UserService)
    private userService: UserService;

 async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string) {
    const user = await this.tryLoginUser(username,password);

    if (!user) {
      return false;
    }

    return user;
  }

  private async tryLoginUser( email : string , password : string) {
    const user = await this.userService.GetUserByEmail(email);

    if (!user) {
      return false; 
    }

    if (!user.verifyPassword(password)) {
      return false; 
    }

    return user;
  }
}