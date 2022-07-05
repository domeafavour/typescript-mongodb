import Router from 'koa-router';
import { findUserById, findUsersByPage } from '../controllers/users';
import { IPagination } from '../typings';

const router = new Router({
  prefix: '/users/',
});

router.post('list', async (ctx) => {
  try {
    const currentPage = await findUsersByPage(ctx.request.body as IPagination);

    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: currentPage,
    };
  } catch (error) {
    console.error(error);

    ctx.status = 500;
    ctx.body = {
      status: 'error',
      data: null,
    };
  }
});

router.get(':id', async (ctx) => {
  try {
    const user = await findUserById(ctx.params.id);

    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: user,
    };
  } catch (error) {
    console.error(error);

    ctx.status = 500;
    ctx.body = {
      status: 'error',
      data: null,
    };
  }
});

export default router;
