import Router from 'koa-router';
import { login, register } from '../controllers/account';
import { Account } from '../typings';

const router = new Router({
  prefix: '/account/',
});

router.post('login', async (ctx) => {
  const body = ctx.request.body as Account.LoginBody;
  const loginResult = await login(body);

  switch (loginResult.status) {
    case 'NO_ACCOUNT': {
      await ctx.render('register', {
        title: 'REGISTER',
      });
      break;
    }
    case 'WRONG_PASSWORD': {
      await ctx.render('login', {
        title: 'LOGIN ERROR',
        error: 'WRONG PASSWORD',
        email: body.email,
      });
      break;
    }
    case 'SUCCESS': {
      await ctx.render('welcome', {
        title: 'WELCOME',
        name: loginResult.user.name,
      });
      break;
    }
    default: {
      break;
    }
  }
});

router.post('register', async (ctx) => {
  const body = ctx.request.body as Account.RegisterBody;
  const registerResult = await register(body);

  switch (registerResult.status) {
    case 'USER_EXISTS': {
      await ctx.render('login', {
        title: 'LOGIN ERROR',
        error: 'USER EXISTS',
        email: body.email,
      });
      break;
    }
    case 'SUCCESS': {
      await ctx.render('welcome', {
        title: 'WELCOME',
        name: registerResult.user.name,
      });
      break;
    }
    default: {
      break;
    }
  }
});

export default router;
