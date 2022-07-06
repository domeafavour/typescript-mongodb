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
      ctx.redirect('/views/register');
      break;
    }
    case 'WRONG_PASSWORD': {
      ctx.redirect('/views/login?error=WRONG_PASSWORD');
      break;
    }
    case 'SUCCESS': {
      ctx.cookies.set('id', loginResult.user.id);
      ctx.redirect('/views/welcome');
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
      ctx.redirect(`/views/login?error=USER EXISTS&email=${body.email}`);
      break;
    }
    case 'SUCCESS': {
      ctx.cookies.set('id', registerResult.user.id);
      ctx.redirect('/views/welcome');
      break;
    }
    default: {
      break;
    }
  }
});

export default router;
