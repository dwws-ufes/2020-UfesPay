
import { BadRequest , NotFound} from '@tsed/exceptions';
import { BodyParams,QueryParams, Controller, Delete, Get, Inject, Post,  Request, Put } from '@tsed/common';
import {TransactionService} from '../application/TransactionService'
import {WalletService} from '../application/WalletService'
import {UserService} from '../application/UserService'
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
    @BodyParams('value') value: number,
    @BodyParams('message') message: string
    ) : Promise<Transaction> {
       if (!userId) throw new BadRequest('Required field userId is empty');
       if (!receiverId) throw new BadRequest('Required field receiverId  is empty');
       if (!value) throw new BadRequest('Required value is empty');
       if (!message) throw new BadRequest('Required message is empty');
 
       try{
      //get user emitter(origin) and receiver(destination)
      const emitter = await this.userService.GetUserById(userId);
      const receiver = await this.userService.GetUserById(receiverId);

      if (!emitter || !receiver) {
        throw new BadRequest('emitter or receiver not found');
      }

      const emitterWallet = await this.walletService.GetWalletById(emitter.wallet.id);
      const receiverWallet = await this.walletService.GetWalletById(receiver.wallet.id);
      if((emitterWallet == null)||(receiverWallet == null)){
        throw new BadRequest('Cound not find emitter or receiver wallets');
      }

      if (emitterWallet.balance < value) {
        throw new BadRequest('Not enought money');
      }

      const transaction = await this.transacService.CreateTransaction({
        message,
        emitter,
        receiver,
        value,
        likes: [],
        comments: [],
      });

      //new code begin
      emitterWallet?.transactions?.push(transaction);
      receiverWallet?.transactions?.push(transaction);
      //new code end

      emitterWallet.balance = emitterWallet.balance - value;
      await this.walletService.UpdateWallet(emitterWallet.id, emitterWallet);

      receiverWallet.balance = receiverWallet.balance + value;
      await  this.walletService.UpdateWallet(emitterWallet.id, receiverWallet);


      return transaction;

      } catch (err) {
        console.log(err);
        throw new BadRequest(err, 'Something went wrong!');
      }
    }

    @Get()
    async list() : Promise<Transaction[]>{
        try{
          const transactions = await this.transacService.ListAllTransactions();
          return  transactions;
           }catch (err) {
            console.log(err);
            throw new BadRequest(err, 'Something went wrong!');
          }  
    }

    @Put('/like')
    async toggleLike(@Request('userId') userId: string,
    @BodyParams('transactionId') transactionId: string,
    ) : Promise<Transaction > {
       if (!userId) throw new BadRequest('Required field userId is empty');
       if (!transactionId) throw new BadRequest('Required field transactionId  is empty');
       try{

        const transaction = await this.transacService.GetTransactionById(transactionId);
        const userLiked = await this.userService.GetUserById(userId);

        if (!transaction) {
         throw new NotFound('Transaction not found');
        }

        if (!userLiked) {
          throw new NotFound('User not found');
         }

        if(transaction.likes){
          const alreadyLiked = transaction.likes.filter(
            likeAuthor => String(likeAuthor.id) === String(userId)
          );
    
          if (alreadyLiked.length) {
            transaction.likes = transaction.likes.filter(likeAuthor => likeAuthor.id === userId);
            await this.transacService.UpdateTransaction(transaction.id, transaction);
            return transaction;
          }
    
          transaction.likes.push(userLiked);
          await this.transacService.UpdateTransaction(transaction.id,transaction);
        }

        return transaction;
       }catch (err) {
        console.log(err);
        throw new BadRequest(err, 'Something went wrong!');
      }
    }

}