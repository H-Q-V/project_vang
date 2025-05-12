import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/info')
  async findInfo(@Req() req) {
    return this.usersService.getInfo(req);
  }

  @Get('/getOne/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return {
      success: true,
      code: 200,
      message: 'get one successfuly',
      data: data,
    };
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    const data = await this.usersService.update(id, updateUserDto, req);
    return {
      success: true,
      code: 200,
      message: 'update successfuly',
      data: data,
    };
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.usersService.remove(id, req);
    return {
      success: true,
      code: 200,
      message: 'delete',
    };
  }
}
