import { Document, Model, model, Types, Schema } from 'mongoose';

import { IUserDocument } from './User';

export interface IComment {
  text: string;
  author: Types.ObjectId | Record<string, unknown>;
}

export interface ICommentDocument extends IComment, Document {
  author: IUserDocument["_id"];
}

export type ICommentModel =  Model<ICommentDocument>;

const CommentSchema = new Schema<ICommentDocument, ICommentModel>({
  text: { type: String, required: true },
  author: { type: Types.ObjectId, ref: 'User', required: true },
});

const Comment = model('Comment', CommentSchema);

export default Comment;