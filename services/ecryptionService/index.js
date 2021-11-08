import bcrypt from 'bcryptjs';
const saltRounds = 10;

export class EncryptionService {
  static async hashPassword(passwordToHash) {
    return await bcrypt.hash(passwordToHash, saltRounds);
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
