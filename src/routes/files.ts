import Router from 'koa-router';
import { FileModel } from '../models/file.model';

const router = new Router({
  prefix: '/files/',
});

router.post('upload', async (ctx) => {
  const maybeFiles = ctx.request.files!.file;

  if (Array.isArray(maybeFiles)) {
    return await FileModel.insertMany(
      maybeFiles.map((file) => ({
        filepath: file.filepath,
        mimetype: file.mimetype,
        newFilename: file.newFilename,
        originalFilename: file.originalFilename,
        size: file.size,
      }))
    );
  } else {
    const fileModel = new FileModel({
      filepath: maybeFiles.filepath,
      mimetype: maybeFiles.mimetype,
      newFilename: maybeFiles.newFilename,
      originalFilename: maybeFiles.originalFilename,
      size: maybeFiles.size,
    });
    return await fileModel.save();
  }
});

export default router;
