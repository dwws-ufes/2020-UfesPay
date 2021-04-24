import { ICommentDocument } from '../models/Comment';
export interface ICommentRepository {
    create: (data: object) => Promise<ICommentDocument | null>;
    findById: (id: string) => Promise<ICommentDocument | null>;
    delete: (id: string) => Promise<void>;
}
declare class CommentRepository implements ICommentRepository {
    create(data: object): Promise<ICommentDocument | null>;
    findById(id: string): Promise<ICommentDocument | null>;
    delete(id: string): Promise<void>;
}
export default CommentRepository;
