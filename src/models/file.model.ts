import mongoose from 'mongoose';

export const fileSchema = new mongoose.Schema({
  filepath: String,
  newFilename: String,
  originalFilename: String,
  mimetype: String,
  size: Number,
});

export const FileModel = mongoose.model('File', fileSchema);
