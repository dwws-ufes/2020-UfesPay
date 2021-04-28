
import { BadRequest , NotFound} from '@tsed/exceptions';
import { BodyParams,QueryParams, Controller, Delete, Get, Inject, Post,  Request, Put } from '@tsed/common';
import {TransactionService} from '../application/TransactionService'
import {WalletService} from '../application/WalletService'
import {UserService} from '../application/UserService'
import {Comment} from '../domain/Comment'
import {Transaction} from '../domain/Transaction';


@Controller('/transaction')
export class TransactionControllerTsed {

    @Inject(UserService)
    private userService: UserService;

    @Inject(TransactionService)
    private transacService: TransactionService;

    @Inject(WalletService)
    private walletService: WalletService;

    @Post('/')
    async create(@Request('userId') userId: string,
    @BodyParams('receiverId') receiverId: string,
    @BodyParams('value') value: string,
    @BodyParams('message') message: string
    ) : Promise<Transaction | undefined > {
       if (!userId) throw new BadRequest('Required field userId is empty');
       if (!receiverId) throw new BadRequest('Required field receiverId  is empty');
       if (!value) throw new BadRequest('Required value is empty');
       if (!message) throw new BadRequest('Required message is empty');
   
       try{
        return undefined;
       }catch (err) {
        console.log(err);
        throw new BadRequest(err, 'Something went wrong!');
      }
    }

    @Get()
    async list() : Promise<Transaction[] | undefined>{
        try{
            return undefined;
           }catch (err) {
            console.log(err);
            throw new BadRequest(err, 'Something went wrong!');
          }  
    }

    @Put('/like')
    async toggleLike(@Request('userId') userId: string,
    @BodyParams('transactionId') transactionId: string,
    ) : Promise<Transaction | undefined > {
       if (!userId) throw new BadRequest('Required field userId is empty');
       if (!transactionId) throw new BadRequest('Required field transactionId  is empty');
   
       try{
        return undefined;
       }catch (err) {
        console.log(err);
        throw new BadRequest(err, 'Something went wrong!');
      }
    }

}