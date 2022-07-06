import Router from 'koa-router';
import { getCollection } from '../connectMongoDb';
import { findUserByEmail, findUserById } from '../controllers/users';
import { Account } from '../typings';

const router = new Router({
  prefix: '/account/',
});

router.post('login', async (ctx) => {
  const body = ctx.request.body as Account.LoginBody;
  const user = await findUserByEmail(body.email);

  if (user === null) {
    return await ctx.render('register', {
      title: 'REGISTER',
    });
  }
  if (body.password === user.password) {
    return await ctx.render('welcome', {
      title: 'WELCOME',
      name: user.name,
    });
  }
  return await ctx.render('login', {
    title: 'LOGIN ERROR',
    error: 'WRONG PASSWORD',
    email: user.email,
  });
});

router.post('register', async (ctx) => {
  const body = ctx.request.body as Account.RegisterBody;

  const user = await findUserByEmail(body.email);
  if (user !== null) {
    return await ctx.render('login', {
      title: 'LOGIN ERROR',
      error: 'USER EXISTS',
      email: user.email,
    });
  }

  const { insertedId } = await getCollection('users').insertOne(body);
  const registerUser = await findUserById(insertedId.toString());

  await ctx.render('welcome', {
    title: 'WELCOME',
    name: registerUser?.name,
  });
});

export default router;
