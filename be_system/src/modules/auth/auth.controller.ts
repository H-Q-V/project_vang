import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateUserDto,
  LoginUser,
} from '../../modules/users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { configDotenv } from 'dotenv';
configDotenv();

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('upload/image')
  @UseGuards(AuthGuard('jwt')) // Assuming you want to protect this route
  @UseInterceptors(FileInterceptor('file')) // Assuming the file is sent with the key 'file'
  // async uploadImage(@Req() req, @UploadedFile() file) {
  //   this.authService.uploadImage(req, file);
  // }
  @Post('register')
  async register(@Body() body: CreateUserDto, @UploadedFile() file) {
    return this.authService.registerUser(body, file);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Res() res, @Req() req) {
    const user = req.user;
    const result = this.authService.loginWithGoogle(user, res);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
