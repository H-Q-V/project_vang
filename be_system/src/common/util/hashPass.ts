import * as bcrypt from 'bcrypt';

export class hashPass {
  static async hashPassword(
    password: string,
  ): Promise<{ hash: string; salt: string }> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
  }

  static async verifyPassword(
    inputPassword: string,
    storedHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedHash);
  }
}
