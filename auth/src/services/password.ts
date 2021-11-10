import bcrypt from 'bcrypt';

export class Password {
  static async toHash(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const match = await bcrypt.compare(suppliedPassword, storedPassword);
    return match;
  }
}
