import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as jsonld from 'jsonld';

import { IUserRepository } from '../database/repositories/UserRepository';
import { ITransactionRepository } from '../database/repositories/TransactionRepository';

import addContext from '../utils/addContext';
import { getByQuery } from "../services/DBPediaService";

export interface ILinkedDataController {
  index: (req: Request, res: Response) => Promise<Response>;
}

@injectable()
class LinkedDataController implements ILinkedDataController {

  constructor(
    @inject('IUserRepository')
    private userRepository: IUserRepository,

    @inject('ITransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) { }

  async index(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const formattedName = name.replace(/-/g, ' ');

      const user = await this.userRepository.findByName(formattedName);
      
      if (!user) {
        return res.status(400).send();
      }

      const transactions = await this.transactionRepository.findByEmitterReceiverId(user.id);

      const { Country } = await getByQuery(user.country); 

      const knows = transactions.map(transaction => {
        const emitter = transaction.emitter.name;
        const receiver = transaction.receiver.name;

        const person = formattedName === emitter ? receiver : emitter;

        return {
          "@type": "Person",
          "@id": `http://localhost:${process.env.PORT}/person/${person.replace(/ /g, '-')}`,
          name: person,
        };
      })

      const jsonLD_compacted = addContext({
        "@id": `http://localhost:${process.env.PORT}/person/${name}`,
        "@type": "Person",
        name: user.name,
        email: user.email,
        country: { "@id": Country.value },
        knows
      });

      const jsonLD = await jsonld.expand(jsonLD_compacted);
  
      return res.status(200).json(jsonLD);
    } catch (e) {
      console.log(e)
      return res.status(500).send();
    }
  }

}

export default LinkedDataController;