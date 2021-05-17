import { Inject, Service } from '@tsed/di';

import { Comment } from '../domain/Comment';
import { User } from '../domain/User';
import { CommentRepository } from '../persistence/CommentRepository';

@Service()
export class CommentService {
    @Inject(CommentRepository)
    private readonly commentRepo: CommentRepository;

  async Delete(comment: Comment) {
        await this.commentRepo.Delete(comment);
  }

  async GetCommentById(commentId: string) {
    const comment = await this.commentRepo.GetById(commentId);
    return comment;
  }

  async CreateComment(comment: Partial<Comment>, author : User) : Promise<Comment> {  
    comment.author = author;
    const newComment = await this.commentRepo.Create(comment);
    return newComment;
  }
}