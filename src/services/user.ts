import {
  CurrentUserVo,
  LoginUserDto,
  RegisterStatus,
  RegisterUserDto,
  UserModel,
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
  return await UserModel.findById<CurrentUserVo>(id, {
    id: {
      $toString: '$_id',
    },
    _id: 0,
    name: 1,
    email: 1,
  });
}
