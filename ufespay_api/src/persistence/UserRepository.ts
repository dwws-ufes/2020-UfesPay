import { User } from '../domain/User';
import { Wallet } from '../domain/Wallet';

import { Injectable } from '@tsed/di';
import { EntityRepository, FindManyOptions, Repository  } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    Create(user: Partial<User>) : Promise<User> {
        return this.save(user);
    }

    ReadAll() : Promise<User[]>{
      const users = this.find({ relations: ['wallet'] });
      return users;
      /*  return this.find({
          relations: ['wallet'],
        });*/
    }

    GetUserByEmail( userEmail: string): Promise<User>{
        return (this.findOneOrFail({
            where: [
              { email: userEmail}
            ]
          }));
    }

    GetUserById(userId: string) : Promise<User>{
        return (this.findOneOrFail({
            where: [
              { id: userId}
            ]
          }));
    }
}