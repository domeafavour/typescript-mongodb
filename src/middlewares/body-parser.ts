import KoaBody from 'koa-body';
import { config } from '../config';

export const bodyParser = KoaBody({
  formidable: {
    uploadDir: config.uploadDir,
    keepExtensions: true,
  },
  urlencoded: true,
  multipart: true,
});
