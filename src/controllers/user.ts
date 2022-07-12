import Router from 'koa-router';
import {
  LoginUserDto,
  RegisterUserDto,
  UpdateCurrentUserDto,
} from '../models/user.model';
import * as userService from './../services/user';

export const login: Router.IMiddleware = async (ctx) => {
  const loginUser = ctx.request.body as LoginUserDto;
  const user = await userService.login(loginUser);

  if (user && ctx.session) {
    ctx.session.currentId = user._id.toString();
    ctx.body = {
      code: 200,
      data: user,
      message: null,
    };
  } else {
    ctx.body = {
      code: 501,
      data: null,
      message: 'LOGIN ERROR',
    };
  }
};

type ServerError = {
  name: string;
  message: string;
};

export const register: Router.IMiddleware = async (ctx) => {
  const registerUser = ctx.request.body as RegisterUserDto;
  try {
    const status = await userService.register(registerUser);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      success: status === 'SUCCESS',
      data: status,
      message: null,
    };
  } catch (e) {
    console.dir(e);

    ctx.status = 500;
    ctx.body = {
      code: 503,
      success: false,
      data: null,
      message: (e as ServerError).message,
    };
  }
};

export const fetchCurrent: Router.IMiddleware = async (ctx) => {
  const user = await userService.fetchCurrent(ctx.session!.currentId);

  ctx.status = 200;
  ctx.body = {
    code: 200,
    success: !!user,
    data: user,
    message: null,
  };
};

export const updateCurrent: Router.IMiddleware = async (ctx) => {
  try {
    const user = ctx.request.body as Omit<UpdateCurrentUserDto, 'id'>;
    const updatedUser = await userService.updateCurrent({
      email: user.email,
      name: user.name,
      id: ctx.session!.currentId,
    });

    ctx.body = {
      code: 200,
      data: updatedUser?.toObject(),
      message: null,
    };
  } catch (error) {
    ctx.body = {
      code: 505,
      data: null,
      message: (error as ServerError).message,
    };
  }
};

export const fetchUser: Router.IMiddleware = async (ctx) => {
  const user = await userService.fetchCurrent(ctx.params.id);

  ctx.status = 200;
  ctx.body = {
    code: 200,
    success: !!user,
    data: user,
    message: null,
  };
};
