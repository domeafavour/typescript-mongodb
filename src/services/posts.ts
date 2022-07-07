import { ObjectId } from 'mongodb';
import { CommentVo } from '../models/comment.model';
import {
  CreatePostDto,
  PostModel,
  PostVo,
  UpdatePostDto,
} from '../models/post.model';
import * as commentsService from './comments';

export async function findAllPosts() {
  return await PostModel.aggregate<PostVo>()
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

type PostWithCommentsVo = PostVo & {
  comments: CommentVo[];
};

export async function findPostById(
  id: string
): Promise<PostWithCommentsVo | null> {
  const posts = await PostModel.aggregate<PostWithCommentsVo>()
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

  const comments = await commentsService.findCommentsByPostId(id);

  return {
    ...posts[0],
    comments,
  };
}
