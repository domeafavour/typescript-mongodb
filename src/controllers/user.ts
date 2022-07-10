import Router from 'koa-router';
import { LoginUserDto, RegisterUserDto } from '../models/user.model';
import * as userService from './../services/user';

export const login: Router.IMiddleware = async (ctx) => {
  const loginUser = ctx.request.body as LoginUserDto;
  const user = await userService.login(loginUser);

  if (user && ctx.session) {
    ctx.session.currentId = user._id.toString();
  }

  ctx.status = 200;
  ctx.body = {
    success: !!user,
    data: user,
  };
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
      success: status === 'SUCCESS',
      data: status,
      message: null,
    };
  } catch (e) {
    console.dir(e);

    ctx.status = 500;
    ctx.body = {
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
    success: !!user,
    data: user,
  };
};
