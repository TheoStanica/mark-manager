import bcrypt from 'bcrypt';

export class Password {
  static async toHash(password: string) {
    return bcrypt.hash(password, 10);
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return bcrypt.compare(suppliedPassword, storedPassword);
  }
}
