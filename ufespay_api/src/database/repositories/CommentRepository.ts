import Comment from '../models/Comment';
import { Repository, getRepository } from 'typeorm';

export interface ICommentRepository {
  create: (data: object) => Promise<Comment>;
  findById: (id: string) => Promise<Comment | undefined>;
  delete: (id: string) => Promise<void>;
}

class CommentRepository implements ICommentRepository{
  // async create(data: object){
  //   const newComment = new Comment(data);
  //   const {_id} = await newComment.save();
  //   const comment = await Comment.findById(_id)
  //     .populate({path : 'author', select: 'name email'});

  //   return comment;
  // }

  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  async create(data: object) {
    const newComment = this.ormRepository.create(data);
    await this.ormRepository.save(newComment);
    return newComment;
  }

  async findById(id: string) {
    const findComment = await this.ormRepository.findOne({
      where: { id },
    });

    return findComment || undefined;
  }

  async delete(id: string) {
    await this.ormRepository.delete({ id });
  }
}

export default CommentRepository;