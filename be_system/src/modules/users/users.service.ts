import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { console } from 'inspector';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async getInfo(req: Request) {
    try {
      const userId = req.user as User;
      console.log(userId);
      const user = await this.userModel.findOne(
        { _id: userId.id },
        { password: 0, _id: 0, salt: 0 },
      );
      return {
        status: 'success',
        user,
      };
    } catch (err) {
      return {
        status: 'error',
        message: 'Lỗi token!',
      };
    }
  }

  async findOne(id: string) {
    const data = await this.userModel.findById(id);
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto, req: any) {
    if (id !== req.user.id) {
      throw new NotFoundException('bạn không có quyền chỉnh sửa thông tin');
    }
    const data = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true },
    );
    return data;
  }

  async remove(id: string, req: any) {
    const id_user = await this.userModel.findById(req.user.id);
    // console.log('wwww', id_user);
    // Kiểm tra user có tồn tại không
    if (!id_user) {
      throw new NotFoundException('User not found');
    }
    const data = await this.userModel.findByIdAndDelete(id);
    return data;
  }
}
