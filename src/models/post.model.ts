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
  commentsCount: number;
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
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdTime: {
    type: Date,
    required: true,
  },
});

export const PostModel = mongoose.model('Post', postSchema);
