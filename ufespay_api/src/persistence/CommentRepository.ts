import { Comment } from '../domain/Comment';
import { User } from '../domain/User';

import { EntityRepository, FindManyOptions, Repository  } from 'typeorm';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

    Create(comment: Partial<Comment>) : Promise<Comment> {
        return this.save(comment);
    }

    async Delete(comment : Comment) {
        await this.delete(comment);
    }

    GetById(id: string) : Promise<Comment | undefined> {
        return this.findOne({
          relations: ['transaction','author'],
          where: { id },
        });
    }
}