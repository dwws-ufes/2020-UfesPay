import { Comment } from '../domain/Comment';
import { User } from '../domain/User';

import { EntityRepository, FindManyOptions, Repository  } from 'typeorm';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

    Create(comment: Partial<Comment>, author : User) : Promise<Comment> {
        comment.author = author;
        return this.save(comment);
    }

    async Delete(comment : Comment) {
        await this.delete(comment);
    }

    GetCommentBy(id: string) : Promise<Comment | undefined> {
        return this.findOne({
          relations: ['transaction','author'],
          where: { id },
        });
    }
}