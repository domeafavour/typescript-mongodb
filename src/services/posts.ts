import { ObjectId } from 'mongodb';
import {
  CreatePostDto,
  PostModel,
  PostVo,
  UpdatePostDto,
} from '../models/post.model';

export async function findAllPosts() {
  return await PostModel.aggregate<PostVo>()
    .lookup({
      from: 'users',
      localField: 'authorId',
      foreignField: '_id',
      as: 'authors',
    })
    .lookup({
      from: 'comments',
      localField: '_id',
      foreignField: 'postId',
      as: 'comments',
    })
    .project({
      id: {
        $toString: '$_id',
      },
      _id: 0,
      title: 1,
      content: 1,
      description: 1,
      createdTime: {
        $dateToString: {
          date: '$createdTime',
          format: '%Y-%m-%d %H:%M:%S',
        },
      },
      author: {
        $first: [
          {
            $map: {
              input: '$authors',
              as: 'at',
              in: {
                id: {
                  $toString: '$$at._id',
                },
                name: '$$at.name',
                email: '$$at.email',
              },
            },
          },
        ],
      },
      commentsCount: {
        $reduce: {
          input: '$comments',
          initialValue: 1,
          in: {
            $add: ['$$value', 1],
          },
        },
      },
    })
    .exec();
}

export async function createPost(dto: CreatePostDto) {
  const postModel = new PostModel({
    authorId: new ObjectId(dto.author),
    content: dto.content,
    createdTime: new Date(),
    description: dto.description,
    title: dto.title,
  });
  await postModel.validate();
  return await postModel.save();
}

export async function deletePost(postId: string) {
  return await PostModel.findByIdAndDelete(postId).exec();
}

export async function updatePost(dto: UpdatePostDto) {
  return await PostModel.findByIdAndUpdate(dto.id)
    .set({
      authorId: new ObjectId(dto.author),
      title: dto.title,
      content: dto.content,
      description: dto.description,
    })
    .exec();
}

export async function findPostById(id: string): Promise<PostVo | null> {
  const posts = await PostModel.aggregate<PostVo>()
    .match({ _id: new ObjectId(id) })
    .lookup({
      from: 'users',
      localField: 'authorId',
      foreignField: '_id',
      as: 'authors',
    })
    .project({
      id: {
        $toString: '$_id',
      },
      _id: 0,
      title: 1,
      content: 1,
      description: 1,
      createdTime: {
        $dateToString: {
          date: '$createdTime',
          format: '%Y-%m-%d %H:%M:%S',
        },
      },
      author: {
        $first: [
          {
            $map: {
              input: '$authors',
              as: 'author',
              in: {
                id: {
                  $toString: '$$author._id',
                },
                name: '$$author.name',
                email: '$$author.email',
              },
            },
          },
        ],
      },
    })
    .exec();

  if (!posts.length) {
    return null;
  }

  return posts[0];
}
