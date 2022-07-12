import mongoose, { ValidatorProps } from 'mongoose';
import { PostVo } from './post.model';

export type LoginUserDto = {
  email: string;
  password: string;
};

export type CurrentUserVo = {
  id: string;
  name: string;
  email: string;
  password: string;
  posts: Omit<PostVo, 'author'>[];
};

export type UpdateCurrentUserDto = Pick<RegisterUserDto, 'email' | 'name'> & {
  id: string;
};

export type LoginStatus = 'SUCCESS' | 'WRONG_ACCOUNT' | 'WRONG_PASSWORD';

export type RegisterStatus = 'SUCCESS' | 'ACCOUNT_EXISTS';

export type RegisterUserDto = {
  email: string;
  name: string;
  password: string;
};

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return /^[^@]+@[^\.]+\.\w+$/.test(v);
      },
      message: (props: ValidatorProps) =>
        `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model('User', userSchema);
