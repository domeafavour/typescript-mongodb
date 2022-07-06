import { ObjectId } from 'mongodb';

export type IPagination = {
  page?: number;
  size?: number;
};

export type WithStringId<T> = T & { id: string };

export type IUser = {
  name: string;
  email: string;
};

export type IPost = {
  title: string;
  authorId: ObjectId;
  content: string;
  description: string;
};

export type IComment = {
  title: string;
  postId: ObjectId;
  userId: ObjectId;
};
