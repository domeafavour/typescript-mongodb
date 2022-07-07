import mongoose from 'mongoose';

export type PostVo = {
  title: string;
  content: string;
  description: string;
  id: string;
  createdTime: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
};

export type CreatePostDto = Readonly<{
  content: string;
  description: string;
  title: string;
  author: string;
}>;

export type UpdatePostDto = CreatePostDto &
  Readonly<{
    id: string;
  }>;

export const postSchema = new mongoose.Schema({
  content: String,
  description: String,
  title: String,
  authorId: mongoose.Types.ObjectId,
  createdTime: Date,
});

export const PostModel = mongoose.model('Post', postSchema);
