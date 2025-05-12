import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from 'src/schemas/question.schema';
import { Model } from 'mongoose';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}
  async create(
    createQuestionDto: CreateQuestionDto,
    req: any,
  ): Promise<Question> {
    const data = await this.questionModel.create(createQuestionDto);
    return data;
  }

  async findAll() {
    const data = await this.questionModel.find();
    return data;
  }

  async findOne(id: string) {
    const data = await this.questionModel.findById(id);
    return data;
  }

  async getQuestion(examId: string) {
    const data = await this.questionModel.find({ exam: examId });
    console.log('aaaaa', examId);
    return data;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const data = await this.questionModel.findByIdAndUpdate(
      id,
      { $set: updateQuestionDto },
      { new: true },
    );
    return data;
  }

  async remove(id: string) {
    const data = await this.questionModel.findByIdAndDelete(id);
    return data;
  }
}
