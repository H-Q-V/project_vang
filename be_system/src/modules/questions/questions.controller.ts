import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/create')
  async create(@Body() createQuestionDto: CreateQuestionDto, @Request() req) {
    const data = await this.questionsService.create(createQuestionDto, req);
    return {
      success: true,
      code: 200,
      messsage: 'create question succesfully',
      data: data,
    };
  }

  @Get('/getAll')
  async findAll() {
    const data = await this.questionsService.findAll();
    return {
      success: true,
      code: 200,
      message: 'get all question successfully',
      data: data,
    };
  }

  @Get('/getOne/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.questionsService.findOne(id);
    return {
      success: true,
      code: 200,
      message: 'getOne question successfully',
      data: data,
    };
  }

  @Get('/getQuestion/:examId')
  async getQuestion(@Param('examId') examId: string) {
    console.log('êrrr', examId);
    const data = await this.questionsService.getQuestion(examId);
    return {
      success: true,
      code: 200,
      message: 'get Question successfully',
      data: data,
    };
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const data = await this.questionsService.update(id, updateQuestionDto);
    return {
      success: true,
      code: 200,
      message: 'update question successfully',
      data: data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.questionsService.remove(id);
    return {
      success: true,
      code: 200,
      message: 'delete question successfully',
    };
  }
}
