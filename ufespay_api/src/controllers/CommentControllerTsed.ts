
import { BadRequest , NotFound} from '@tsed/exceptions';
import { BodyParams,QueryParams, Controller, Delete, Inject, Post,  Request, Put } from '@tsed/common';
import {CommentService} from '../application/CommentService'
import {TransactionService} from '../application/TransactionService'
import {UserService} from '../application/UserService'
import {Comment} from '../domain/Comment'


@Controller('/comment')
export class CommentControllerTsed {
    @Inject(CommentService)
    private commentService: CommentService;

    @Inject(UserService)
    private userService: UserService;

    @Inject(TransactionService)
    private transacService: TransactionService;

    @Delete()
    async delete( @Request('userId') userId: string ,
                  @QueryParams('id') commentId: string   
    ) {

        try{
            const comment = await this.commentService.GetCommentById(commentId as string);

            if (!comment) {
                throw new BadRequest('Comment user found'); 
            }

            if (userId !== String(comment.author)) {
                throw new BadRequest('You are not this comment author.');
            }

            await this.commentService.Delete(comment);
        }catch(err){
            console.log(err);
            throw new BadRequest('Something went wrong',err);
        }
    }

    @Post('/')
    async create(@Request('userId') userId: string,
    @BodyParams('text') text: string,
    @BodyParams('transactionId') transactionId: string
    ) : Promise<Comment> {
       if (!userId) throw new BadRequest('Required field userId is empty');
       if (!text) throw new BadRequest('Required field comment text is empty');
       if (!transactionId) throw new BadRequest('Required transactionId is empty');
   
       try{
       const transaction = await this.transacService.GetTransactionById(transactionId);

       if (!transaction) {
        throw new NotFound('Invalid transaction');
       }

       const author = await this.userService.GetUserById(userId);

       if (!author) {
        throw new NotFound('Invalid author');
       }

    const comment = await this.commentService.CreateComment({text}, author);

    
      transaction?.comments?.push(comment);
      await this.transacService.UpdateTransaction(transactionId, transaction);
      
      return comment;
      

       }catch (err) {
        console.log(err);
        throw new BadRequest(err, 'Something went wrong!');
      }
    }

}