import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exam } from 'src/schemas/exam.schema';
import { Model } from 'mongoose';
import { timeEnd } from 'console';

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam.name) private examModel: Model<Exam>) {}

  private convertToISODate(date: string, time: string): string {
    // Chuyển đổi "Saturday, 29 March" và "07:55" thành "2025-02-16T16:04:58.426+00:00"
    const [dayName, dayNum, month] = date.split(' ');
    const [hours, minutes] = time.split(':');

    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const newDate = new Date(
      year,
      monthMap[month],
      parseInt(dayNum),
      parseInt(hours),
      parseInt(minutes),
      0,
    );

    return newDate.toISOString();
  }

  async create(createExamDto: CreateExamDto, req: any) {
    try {
      const { date, timeStart, timeEnd } = createExamDto;

      // Chuyển đổi các mốc thời gian sang định dạng ISO
      const isoDate = this.convertToISODate(date, timeStart);
      const isoTimeStart = this.convertToISODate(date, timeStart);
      const isoTimeEnd = this.convertToISODate(date, timeEnd);

      const examData = {
        ...createExamDto,
        date: isoDate,
        timeStart: isoTimeStart,
        timeEnd: isoTimeEnd,
        teacher: req.user.id,
      };

      const data = await this.examModel.create(examData);
      if (!data) {
        throw new NotFoundException('Không thể tạo bài kiểm tra');
      }
      return data;
    } catch (error) {
      throw new Error(`Lỗi khi tạo bài kiểm tra: ${error.message}`);
    }
  }
  // async create(createExamDto: CreateExamDto, req: any) {
  //   createExamDto.teacher = req.user.id;
  //   const data = await this.examModel.create(createExamDto);
  //   if (!data) {
  //     throw new NotFoundException('Faild to create exam');
  //   }
  //   return data;
  // }

  async findAll() {
    const data = await this.examModel.find();
    return data;
  }

  async findOne(id: string) {
    const data = await this.examModel.findById(id);
    return data;
  }

  // async UpComingExam() {
  //   const currentDate = new Date();
  //   console.log('Current date:', currentDate);

  //   try {
  //     const allExams = await this.examModel.find();
  //     console.log('All exams found:', allExams);

  //     const upcomingAndOngoingExams = allExams.filter((exam) => {
  //       const [dayName, date, month] = exam.date.split(' ');
  //       const [startHours, startMinutes] = exam.timeStart.split(':');
  //       const [endHours, endMinutes] = exam.timeEnd.split(':');
  //       console.log('Processing exam:', {
  //         date: exam.date,
  //         timeStart: exam.timeStart,
  //         timeEnd: exam.timeEnd,
  //         parsed: {
  //           dayName,
  //           date,
  //           month,
  //           startHours,
  //           startMinutes,
  //           endHours,
  //           endMinutes,
  //         },
  //       });

  //       const monthMap = {
  //         January: 0,
  //         February: 1,
  //         March: 2,
  //         April: 3,
  //         May: 4,
  //         June: 5,
  //         July: 6,
  //         August: 7,
  //         September: 8,
  //         October: 9,
  //         November: 10,
  //         December: 11,
  //       };

  //       const examStartDate = new Date(
  //         currentDate.getFullYear(),
  //         monthMap[month],
  //         parseInt(date.replace(',', '')),
  //         parseInt(startHours),
  //         parseInt(startMinutes),
  //       );

  //       const examEndDate = new Date(
  //         currentDate.getFullYear(),
  //         monthMap[month],
  //         parseInt(date.replace(',', '')),
  //         parseInt(endHours),
  //         parseInt(endMinutes),
  //       );

  //       if (monthMap[month] < currentDate.getMonth()) {
  //         examStartDate.setFullYear(currentDate.getFullYear() + 1);
  //         examEndDate.setFullYear(currentDate.getFullYear() + 1);
  //       }

  //       console.log('Exam start date:', examStartDate);
  //       console.log('Exam end date:', examEndDate);
  //       console.log(
  //         'Is upcoming or ongoing:',
  //         examStartDate >= currentDate ||
  //           (examStartDate <= currentDate && examEndDate >= currentDate),
  //       );
  //       // return currentDate <= examEndDate;

  //       return (
  //         examStartDate >= currentDate ||
  //         (examStartDate <= currentDate && examEndDate >= currentDate)
  //       );
  //     });

  //     console.log(
  //       'Filtered upcoming and ongoing exams:',
  //       upcomingAndOngoingExams,
  //     );

  //     const sortedExams = upcomingAndOngoingExams.sort((a, b) => {
  //       const getExamTime = (exam) => {
  //         const [dayName, date, month] = exam.date.split(' ');
  //         const [hours, minutes] = exam.timeStart.split(':');
  //         const monthMap = {
  //           January: 0,
  //           February: 1,
  //           March: 2,
  //           April: 3,
  //           May: 4,
  //           June: 5,
  //           July: 6,
  //           August: 7,
  //           September: 8,
  //           October: 9,
  //           November: 10,
  //           December: 11,
  //         };
  //         return new Date(
  //           currentDate.getFullYear(),
  //           monthMap[month],
  //           parseInt(date.replace(',', '')),
  //           parseInt(hours),
  //           parseInt(minutes),
  //         ).getTime();
  //       };
  //       return getExamTime(a) - getExamTime(b);
  //     });

  //     console.log('Final sorted exams:', sortedExams);
  //     return sortedExams;
  //   } catch (error) {
  //     console.error('Error in UpComingExam:', error);
  //     throw new NotFoundException(
  //       'Không thể lấy danh sách bài kiểm tra sắp tới',
  //     );
  //   }
  // }

  // async Overdue() {
  //   const currentDate = new Date();
  //   console.log('Current date:', currentDate);

  //   try {
  //     const allExams = await this.examModel.find();
  //     console.log('All exams found:', allExams);

  //     const pastExams = allExams.filter((exam) => {
  //       const [dayName, date, month] = exam.date.split(' ');
  //       const [hours, minutes] = exam.timeEnd.split(':');

  //       console.log('Processing exam:', {
  //         date: exam.date,
  //         time: exam.timeEnd,
  //         parsed: { dayName, date, month, hours, minutes },
  //       });

  //       const monthMap = {
  //         January: 0,
  //         February: 1,
  //         March: 2,
  //         April: 3,
  //         May: 4,
  //         June: 5,
  //         July: 6,
  //         August: 7,
  //         September: 8,
  //         October: 9,
  //         November: 10,
  //         December: 11,
  //       };

  //       const examDate = new Date(
  //         currentDate.getFullYear(),
  //         monthMap[month],
  //         parseInt(date.replace(',', '')),
  //         parseInt(hours),
  //         parseInt(minutes),
  //       );

  //       if (monthMap[month] > currentDate.getMonth()) {
  //         examDate.setFullYear(currentDate.getFullYear() - 1);
  //       }

  //       console.log('Exam date created:', examDate);
  //       console.log('Is past:', examDate < currentDate);

  //       return examDate < currentDate;
  //     });

  //     console.log('Filtered past exams:', pastExams);

  //     const sortedExams = pastExams.sort((a, b) => {
  //       const getExamTime = (exam) => {
  //         const [dayName, date, month] = exam.date.split(' ');
  //         const [hours, minutes] = exam.timeEnd.split(':');
  //         const monthMap = {
  //           January: 0,
  //           February: 1,
  //           March: 2,
  //           April: 3,
  //           May: 4,
  //           June: 5,
  //           July: 6,
  //           August: 7,
  //           September: 8,
  //           October: 9,
  //           November: 10,
  //           December: 11,
  //         };

  //         return new Date(
  //           currentDate.getFullYear(),
  //           monthMap[month],
  //           parseInt(date.replace(',', '')),
  //           parseInt(hours),
  //           parseInt(minutes),
  //         ).getTime();
  //       };

  //       return getExamTime(b) - getExamTime(a);
  //     });

  //     console.log('Final sorted past exams:', sortedExams);
  //     return sortedExams;
  //   } catch (error) {
  //     console.error('Error in PastExam:', error);
  //     throw new NotFoundException(
  //       'Không thể lấy danh sách bài kiểm tra đã diễn ra',
  //     );
  //   }
  // }

  async UpComingExam() {
    const currentDate = new Date();
    try {
      const upcomingAndOngoingExams = await this.examModel
        .find({
          $or: [
            { timeStart: { $gte: currentDate } },
            {
              $and: [
                { timeStart: { $lte: currentDate } },
                { timeEnd: { $gte: currentDate } },
              ],
            },
          ],
        })
        .sort({ timeStart: 1 });
      return upcomingAndOngoingExams;
    } catch (error) {
      console.error('Error in UpComingExam:', error);
      throw new NotFoundException(
        'Không thể lấy danh sách bài kiểm tra sắp tới',
      );
    }
  }

  // async Overdue() {
  //   const currentDate = new Date();

  //   try {
  //     const overdueExams = await this.examModel
  //       .find({
  //         timeEnd: { $lt: currentDate },
  //       })
  //       .sort({ timeEnd: -1 });
  //     console.log("wwwww", currentDate)
  //     return overdueExams;
  //   } catch (error) {
  //     console.error('Error in Overdue:', error);
  //     throw new NotFoundException(
  //       'Không thể lấy danh sách bài kiểm tra đã diễn ra',
  //     );
  //   }
  // }
  async Overdue() {
    const currentDate = new Date();
    console.log('Thời gian hiện tại (UTC):', currentDate.toISOString());
  
    try {
      const allExams = await this.examModel.find({});
      console.log('Tổng số bài kiểm tra:', allExams.length);
      allExams.forEach((exam) => {
        console.log(`- ${exam.title} | timeEnd: ${exam.timeEnd.toISOString()}`);
      });
  
      const overdueExams = await this.examModel
        .find({
          timeEnd: { $lt: currentDate },
        })
        .sort({ timeEnd: -1 });
  
      console.log('Số bài kiểm tra quá hạn:', overdueExams.length);
      return overdueExams;
    } catch (error) {
      console.error('Error in Overdue:', error);
      throw new NotFoundException(
        'Không thể lấy danh sách bài kiểm tra đã diễn ra',
      );
    }
  }
  

  async Duration(id: string) {
    const data = await this.examModel.findById(id);
    if (!data) {
      throw new NotFoundException('Exam not found');
    }

    const duration = data.duration;
    const minutes = Math.floor(duration);
    const seconds = 0;

    return {
      minutes,
      seconds,
      formatted: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    };
  }

  async update(id: string, updateExamDto: UpdateExamDto, req: any) {
    const existingExam = await this.examModel.findById(id);
    if (!existingExam) {
      throw new NotFoundException('Không tìm thấy bài kiểm tra');
    }

    if (existingExam.teacher.toString() !== req.user.id) {
      throw new ForbiddenException(
        'Bạn không có quyền cập nhật bài kiểm tra này',
      );
    }
    const update = await this.examModel.findByIdAndUpdate(
      id,
      { $set: updateExamDto },
      { new: true },
    );
    return update;
  }

  async remove(id: string, req: any) {
    // Tìm exam trước khi xóa
    const exam = await this.examModel.findById(id);
    if (!exam) {
      throw new NotFoundException('Không tìm thấy bài kiểm tra');
    }
    // Kiểm tra quyền xóa
    if (exam.teacher.toString() !== req.user.id) {
      throw new ForbiddenException('Bạn không có quyền xóa bài kiểm tra này');
    }
    await this.examModel.findByIdAndDelete(id);
    return true;
  }
}
