import mongoose, { ValidatorProps } from 'mongoose';

export type LoginUserDto = {
  email: string;
  password: string;
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
