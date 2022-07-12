import mongoose from 'mongoose';

/**
 * ```
 *  {
 *    id: {
 *      $toString: '$_id',
 *    },
 *    _id: false,
 *    url: {
 *      $replaceOne: {
 *        input: '$filepath',
 *        find: `${your upload dir}`,
 *        replacement: '',
 *      },
 *    },
 *    fileName: '$originalFilename',
 *    mimetype: true,
 *    size: true,
 *  }
 * ```
 */

export type FileVo = {
  id: string;
  size: number;
  mimetype: string;
  url: string;
  fileName: string;
};

export const fileSchema = new mongoose.Schema({
  filepath: String,
  newFilename: String,
  originalFilename: String,
  mimetype: String,
  size: Number,
});

export const FileModel = mongoose.model('File', fileSchema);
