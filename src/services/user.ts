import { ObjectId } from 'mongodb';
import {
  CurrentUserVo,
  LoginUserDto,
  RegisterStatus,
  RegisterUserDto,
  UpdateCurrentUserDto,
  UserModel
} from '../models/user.model';

export async function login(dto: LoginUserDto) {
  const foundUser = await UserModel.findOne({ email: dto.email }).exec();
  if (foundUser) {
    if (foundUser.password === dto.password) {
      return foundUser;
    }
  }
  return null;
}

export async function register(dto: RegisterUserDto): Promise<RegisterStatus> {
  const foundUser = await UserModel.findOne({ email: dto.email }).exec();
  if (foundUser) {
    return 'ACCOUNT_EXISTS';
  }
  const userModel = new UserModel({
    email: dto.email,
    name: dto.name,
    password: dto.password,
  });
  await userModel.validate();
  await userModel.save();
  return 'SUCCESS';
}

export async function fetchCurrent(id: string): Promise<CurrentUserVo | null> {
  const users = await UserModel.aggregate<CurrentUserVo>()
    .match({ _id: new ObjectId(id) })
    .lookup({
      from: 'posts',
      localField: '_id',
      foreignField: 'authorId',
      as: 'posts',
    })
    .project({
      id: {
        $toString: '$_id',
      },
      _id: 0,
      name: 1,
      email: 1,
      posts: {
        $map: {
          input: '$posts',
          as: 'post',
          in: {
            id: {
              $toString: '$$post._id',
            },
            content: '$$post.content',
            description: '$$post.description',
            title: '$$post.title',
            createdTime: {
              $dateToString: {
                date: '$$post.createdTime',
                format: '%Y-%m-%d %H:%M:%S',
              },
            },
          },
        },
      },
    })
    .exec();

  if (!users.length) {
    return null;
  }
  return users[0];
}

export async function updateCurrent(dto: UpdateCurrentUserDto) {
  return UserModel.findByIdAndUpdate(dto.id)
    .set({
      name: dto.name,
      email: dto.email,
    })
    .exec();
}
