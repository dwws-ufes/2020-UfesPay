import { Request, Response } from '@tsed/common';
import { User } from '../domain/User';
export declare class SessionController {
    private userService;
    signIn(request: Request, email: string, password: string): Promise<{
        token: string;
        user: User;
    } | {
        token: null;
        user?: undefined;
    }>;
    signOut(request: Request, response: Response): Promise<{
        token: null;
    }>;
    private tryLoginUser;
}
