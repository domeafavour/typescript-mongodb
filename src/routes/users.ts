import Router from 'koa-router';
import { ObjectId } from 'mongodb';
import { client } from '../connectMongoDb';
import { IPagination, IUser } from '../typings';

const router = new Router({
  prefix: '/users/',
});

const testDb = client.db('test');

router.post('list', async (ctx) => {
  try {
    const { page = 1, size = 10 } = ctx.request.body as IPagination;

    // db.users.users.find();
    const collection = testDb.collection<IUser>('users');
    const usersCursor = collection
      .find({})
      // .project<{ name: string }>({
      //   name: 1,
      // })
      .skip((page - 1) * size)
      .limit(size);

    const users = await usersCursor.toArray();
    const total = await collection.countDocuments();

    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: {
        total,
        data: users,
      },
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
    const collection = testDb.collection<IUser>('users');

    const user = await collection.findOne({
      _id: new ObjectId(ctx.params.id),
    });

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
