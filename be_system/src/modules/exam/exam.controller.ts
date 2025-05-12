import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('/create')
  async create(@Body() createExamDto: CreateExamDto, @Request() req: any) {
    const data = await this.examService.create(createExamDto, req);
    return {
      success: true,
      code: 200,
      message: 'create successfuly',
      data: data,
    };
  }

  @Get('/getAll')
  async findAll() {
    const data = await this.examService.findAll();
    return {
      success: true,
      code: 200,
      message: 'get all successfully',
      data: data,
    };
  }

  @Get('/getOne/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.examService.findOne(id);
    return {
      success: true,
      code: 200,
      message: 'getOne successfully',
      data: data,
    };
  }

  @Get('/UpcomingExam')
  async UpComingExam() {
    const data = await this.examService.UpComingExam();
    return {
      success: true,
      code: 200,
      message: 'upcomingExam successfully',
      data: data,
    };
  }

  @Get('/Overdue')
  async Overdue() {
    const data = await this.examService.Overdue();
    return {
      success: true,
      code: 200,
      message: 'overdue successfully',
      data: data,
    };
  }

  @Get('/duration/:id')
  async Duration(@Param('id') id: string) {
    const data = await this.examService.Duration(id);
    return {
      success: true,
      code: 200,
      message: 'duration successfully',
      data: data,
    };
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
    @Request() req: any,
  ) {
    const data = await this.examService.update(id, updateExamDto, req);
    return {
      success: true,
      code: 200,
      message: 'update exam successfully',
      data: data,
    };
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.examService.remove(id, req);
    return {
      success: true,
      code: 200,
      message: 'delete exam successfuly',
    };
  }
}
