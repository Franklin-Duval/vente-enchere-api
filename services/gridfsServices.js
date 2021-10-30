const mongoose = require('mongoose');
const fs = require('fs');

const conn = async function getDb() {
  const dbName = 'kmt_sarl';
  const dbUrl = 'mongodb://localhost:27017/';
  const client = new mongoose.mongo.MongoClient(dbUrl);

  await client.connect();
  return client.db(dbName);
};

class GridFSService {
  uploadFile = async (filePath, filename, options) => {
    const db = await conn();
    const bucket = new mongoose.mongo.GridFSBucket(db);
    const stream = await fs
      .createReadStream(filePath)
      .pipe(bucket.openUploadStream(filename, options));

    return new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  };

  getFile = async (fileId) => {
    const db = await conn();
    const bucket = new mongoose.mongo.GridFSBucket(db);
    const downStream = bucket.openDownloadStream(
      new mongoose.mongo.ObjectId(fileId),
    );
    return downStream;
  };

  deleteFile = async (fileId) => {
    const db = await conn();
    const bucket = new mongoose.mongo.GridFSBucket(db);
    return await bucket.delete(new mongoose.mongo.ObjectId(fileId));
  };
}

module.exports = GridFSService;
