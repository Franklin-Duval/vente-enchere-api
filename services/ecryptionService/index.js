const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.hashPassword = async (passwordToHash) => {
  return await bcrypt.hash(passwordToHash, saltRounds);
};

exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
