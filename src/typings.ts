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

export module Account {
  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  export type LoginStatus = 'SUCCESS' | 'WRONG_PASSWORD' | 'NO_ACCOUNT';

  export type LoginBody = {
    email: string;
    password: string;
  };

  export type RegisterStatus = 'USER_EXISTS' | 'SUCCESS';

  export type RegisterBody = {
    email: string;
    name: string;
    password: string;
  };
}
