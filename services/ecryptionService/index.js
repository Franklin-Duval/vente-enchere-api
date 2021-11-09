const bcrypt = require('bcrypt');
const saltRounds = 10;

/* export class EncryptionService {
  static async hashPassword(passwordToHash) {
    return await bcrypt.hash(passwordToHash, saltRounds);
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
} */

exports.hashPassword = async (passwordToHash) => {
  return await bcrypt.hash(passwordToHash, saltRounds);
};

exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
