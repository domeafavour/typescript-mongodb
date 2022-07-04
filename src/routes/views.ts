import { ObjectID } from 'bson';
import Router from 'koa-router';
import { client } from '../connectMongoDb';
import { IPost, IUser } from '../typings';

const router = new Router({
  prefix: '/views/',
});

const db = client.db('test');

router.get('posts', async (ctx) => {
  const cursor = db.collection('posts').find({});
  const posts = await cursor.toArray();

  await ctx.render('posts', {
    title: 'Posts',
    posts,
  });
});

router.get('posts/:id', async (ctx) => {
  const post = await db.collection('posts').findOne<IPost>({
    _id: new ObjectID(ctx.params.id),
  });

  const commentsCursor = db
    .collection('comments')
    .aggregate<IPost & { users: IUser[] }>([
      {
        $lookup: {
          localField: 'userId',
          from: 'users',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $project: {
          title: 1,
          users: 1,
        },
      },
    ]);

  const comments = await commentsCursor.toArray();

  await ctx.render('post-detail', {
    title: post?.title,
    post: {
      ...post,
      comments: comments.map((comment) => ({
        title: comment.title,
        user: comment.users[0],
      })),
    },
  });
});

export default router;
