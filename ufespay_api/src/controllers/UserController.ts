import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '../database/repositories/UserRepository';
import { IWalletRepository } from '../database/repositories/WalletRepository';

import { getByQuery } from '../services/DBPediaService';

export interface IUserController {
  create: (req: Request, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
  update: (req: Request, res: Response) => Promise<Response>;
  index: (req: Request, res: Response) => Promise<Response>;
  list: (req: Request, res: Response) => Promise<Response>;
}

  @injectable()
  class UserController implements IUserController {
  
    constructor(
      @inject('IUserRepository')
      private userRepository: IUserRepository,
  
      @inject('IWalletRepository')
      private walletRepository: IWalletRepository,
    ) { }

  async create(req: Request, res: Response) {
    
    try {
      const { name, email, password, country } = req.body;

      const formatCountryName = (countryName: string) => {
        const words = countryName.split(" ");

        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join("_");
      };

      const formattedCountry = formatCountryName(country);      

      const countryData = await getByQuery(formattedCountry);

      if (!countryData) {
        return res.status(404).json({ message: 'Invalid country.'});
      }

      // check if email already exist
      const existentUser = await this.userRepository.findByEmail(email);
  
      if (existentUser) {
        return res.status(400).json({ message: 'E-mail already in use.'});
      }

      // create wallet
      const wallet = await this.walletRepository.create();
  
      // create user
      const user = await this.userRepository.create({
        name,
        email,
        password,
        wallet,
        country: formattedCountry,
      });
  
      return res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { userId } = req;
  
      const user = await this.userRepository.findById(userId);
  
      if (!user) {
        return res.status(400).json({ message: 'User do not exist.'});
      }

      const { Currency, Language } = await getByQuery(user.country);

  
      return res.status(200).json({ user: { ...user, currency: Currency.value, language: Language.value } });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { userId } = req;

      const users = await this.userRepository.getOthers(userId);
  
      return res.status(200).json({ users });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { name, email, newPassword, password } = req.body;

      const user = await this.userRepository.findById(userId);

      if(newPassword && user?.password !== password) {
        return res.status(400).json({ message: 'Wrong password.' });
      } 

      const newUserData = { name, email, password: newPassword };
      let newUser = {};

      Object.keys(newUserData).forEach((key, value) => {
        if(value)
          newUser = {...newUser, [key]: value}
      });

      const updatedUser = await this.userRepository.update(userId, newUserData);

      return res.status(200).json({ user: updatedUser });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId } = req;

      // get user
      const user = await this.userRepository.findById(userId);

      if (!user) {
        return res.status(400).json({ message: 'User do not exist.'});
      }

      // delete wallet
      await this.walletRepository.delete(user.wallet.id);

      // delete user
      await this.userRepository.delete(user.email);

      return res.status(200).send();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }
}

export default UserController;