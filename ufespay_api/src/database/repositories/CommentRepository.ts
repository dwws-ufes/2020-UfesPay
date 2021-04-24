import Comment, { ICommentDocument } from '../models/Comment';

export interface ICommentRepository {
  create: (data: object) => Promise<ICommentDocument | null>;
  findById: (id: string) => Promise<ICommentDocument | null>;
  delete: (id: string) => Promise<void>;
}

class CommentRepository implements ICommentRepository{
  async create(data: object){
    const newComment = new Comment(data);
    const {_id} = await newComment.save();
    const comment = await Comment.findById(_id)
      .populate({path : 'author', select: 'name email'});

    return comment;
  }

  async findById(id: string){
    return Comment.findById(id);
  }

  async delete(id: string){
    await Comment.deleteOne({_id: id});
  }
}

export default CommentRepository;