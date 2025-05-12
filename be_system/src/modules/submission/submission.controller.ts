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
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('/create')
  async create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Request() req,
  ) {
    const data = await this.submissionService.create(createSubmissionDto, req);
    return {
      success: true,
      code: 200,
      message: 'create submission successfuly',
      data: data,
    };
  }

  @Get('/getAll')
  async findAll() {
    const data = await this.submissionService.findAll();
    return {
      success: true,
      code: 200,
      message: 'get all submission successfuly',
      data: data,
    };
  }

  @Get('/getOne/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.submissionService.findOne(id);
    return {
      success: true,
      code: 200,
      message: 'get One submission successfuly',
      data: data,
    };
  }
}
