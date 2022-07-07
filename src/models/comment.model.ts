import mongoose from 'mongoose';

export type CommentVo = {
  title: string;
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type CreateCommentDto = Readonly<{
  title: string;
  postId: string;
  userId: string;
}>;

export type UpdateCommentDto = CreateCommentDto &
  Readonly<{
    id: string;
  }>;

export const commentSchema = new mongoose.Schema({
  title: String,
  postId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
});

export const CommentModel = mongoose.model('Comment', commentSchema);
