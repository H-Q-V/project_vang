import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Submission } from 'src/schemas/submission.schema';
import { Question } from 'src/schemas/question.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto, req: any) {
    try {
      createSubmissionDto.student = req.user.id;

      const danhSachIdCauHoi = createSubmissionDto.answers.map(
        (a) => new Types.ObjectId(a.question),
      );
      const danhSachCauHoi = await this.questionModel
        .find({
          _id: { $in: danhSachIdCauHoi },
        })
        .lean();

      let soCauDung = 0;
      createSubmissionDto.answers.forEach((cauTraLoiHocSinh) => {
        const cauHoi = danhSachCauHoi.find(
          (q) => q._id.toString() === cauTraLoiHocSinh.question,
        );
        if (cauHoi && cauHoi.correctAnswer === cauTraLoiHocSinh.answer) {
          soCauDung++;
        }
      });

      const tongSoCau = danhSachCauHoi.length;
      const diemSo = (soCauDung / tongSoCau) * 10;

      const ketQuaNopBai = await this.submissionModel.create({
        ...createSubmissionDto,
        score: Math.round(diemSo * 100) / 100,
        totalQuestions: tongSoCau,
        correctAnswers: soCauDung,
        submittedAt: new Date(),
      });

      return ketQuaNopBai;
    } catch (error) {
      throw new Error(`Lỗi khi nộp bài: ${error.message}`);
    }
  }

  async findAll() {
    const data = await this.submissionModel.find();
    return data;
  }

  async findOne(id: string) {
    const data = await this.submissionModel.findById(id);
    return data;
  }

  // async update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
  //   const data = await this.submissionModel.findByIdAndUpdate(
  //     id,
  //     { $set: updateSubmissionDto },
  //     { new: true },
  //   );
  //   return data;
  // }

  // async remove(id: string) {
  //   const data = await this.submissionModel.findByIdAndDelete(id);
  //   return data;
  // }
}
