const mongoose = require('mongoose');
const fs = require('fs');

class GridFSService {
  uploadFile = async (filePath, filename, options) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const stream = await fs
      .createReadStream(filePath)
      .pipe(bucket.openUploadStream(filename, options));

    return new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  };

  getFile = async (fileId) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const downStream = bucket.openDownloadStream(
      new mongoose.mongo.ObjectId(fileId),
    );
    return downStream;
  };

  deleteFile = async (fileId) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    return await bucket.delete(new mongoose.mongo.ObjectId(fileId));
  };
}

module.exports = GridFSService;
