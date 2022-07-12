import KoaBody from 'koa-body';
import path from 'path';
import { config } from '../config';

export const bodyParser = KoaBody({
  formidable: {
    uploadDir: config.uploadDir,
    async onFileBegin(name, file) {
      file.filepath = file.filepath.replace(
        new RegExp(`[^${path.sep}]+$`),
        file.newFilename + path.extname(file.originalFilename!)
      );
    },
  },
  urlencoded: true,
  multipart: true,
});
