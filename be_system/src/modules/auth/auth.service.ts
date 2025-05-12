import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserDto,
  LoginUser,
} from '../../modules/users/dto/create-user.dto';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { generateToken, verifyToken } from '../../common/util/jwt';
import { Response } from 'express';
import { hashPass } from 'src/common/util/hashPass';
import { configDotenv } from 'dotenv';
import { upload } from 'src/common/util/upload';
configDotenv();

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async registerUser(body: CreateUserDto, file: any) {
    let { name, email, password, profileImage } = body;
    const passHash = hashPass.hashPassword(password);
    const url = await upload(file);
    console.log(body, passHash, url);
    // return {
    //   message: 'Đăng kí tài khoản thành công',
    //   user: body,
    // };
  }

  async loginWithGoogle(user: any, res: Response): Promise<any> {
    let existingUser = await this.userModel.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new this.userModel({
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        profileImage: user.picture,
        isActive: true,
      });
      existingUser = await newUser.save();
    }
    const userId = (existingUser as User & { _id: string })._id.toString();
    const token = generateToken(userId);
    return res.redirect(`http://localhost:3303?token=${token}`);
  }

  async uploadImage(req: Request, file: any): Promise<any> {
    const apiToken = process.env.API_TOKEN_IMG;
    const accountId = process.env.ACCOUNT_ID_IMG;

    if (!file) return { success: false };

    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: formData,
      },
    ).then((r) => r.json());

    return { success: !!res.result.variants[0], url: res.result.variants[0] };
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  // findAll() {
  //   return `This action returns all auth`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
