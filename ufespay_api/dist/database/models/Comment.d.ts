import { Document, Model, Types } from 'mongoose';
import { IUserDocument } from './User';
export interface IComment {
    text: string;
    author: Types.ObjectId | Record<string, unknown>;
}
export interface ICommentDocument extends IComment, Document {
    author: IUserDocument["_id"];
}
export declare type ICommentModel = Model<ICommentDocument>;
declare const Comment: ICommentModel;
export default Comment;
