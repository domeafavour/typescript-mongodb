import { ObjectId } from 'mongodb';
import {
  CommentVo,
  CommentModel,
  CreateCommentDto,
  UpdateCommentDto,
} from '../models/comment.model';

export async function findCommentsByPostId(postId: string) {
  return await CommentModel.aggregate<CommentVo>([])
    .match({
      postId: new ObjectId(postId),
    })
    .lookup({
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'users',
    })
    .project({
      title: 1,
      id: {
        $toString: '$_id',
      },
      _id: 0,
      user: {
        $first: [
          {
            $map: {
              input: '$users',
              as: 'user',
              in: {
                name: '$$user.name',
                email: '$$user.email',
                id: {
                  $toString: '$$user._id',
                },
              },
            },
          },
        ],
      },
    })
    .exec();
}

export async function createComment(dto: CreateCommentDto) {
  const model = new CommentModel({
    title: dto.title,
    postId: new ObjectId(dto.postId),
    userId: new ObjectId(dto.userId),
  });
  await model.validate();
  return await model.save();
}

export async function updateComment(dto: UpdateCommentDto) {
  return await CommentModel.findByIdAndUpdate(dto.id)
    .set({
      title: dto.title,
      postId: new ObjectId(dto.postId),
      userId: new ObjectId(dto.userId),
    })
    .exec();
}

export async function deleteComment(commentId: string) {
  return await CommentModel.findByIdAndDelete(commentId).exec();
}
