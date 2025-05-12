// import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

// export class CreateExamDto {
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @IsString()
//   @IsNotEmpty()
//   subject: string;

//   @IsArray()
//   @IsNotEmpty()
//   @IsString({ each: true })
//   questions: string[];

//   @IsNumber()
//   @IsNotEmpty()
//   duration: number;

//   @IsNumber()
//   @IsNotEmpty()
//   teacher: string;

//   @IsString()
//   @IsNotEmpty()
//   date: string;

//   @IsString()
//   @IsNotEmpty()
//   timeStart: string;

//   @IsString()
//   @IsNotEmpty()
//   timeEnd: string;
// }
import {
  IsString,
  IsNumber,
  IsArray,
  IsNotEmpty,
  IsDateString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExamDto {
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Môn học không được để trống' })
  subject: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Danh sách câu hỏi không được để trống' })
  questions: string[];

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Thời gian làm bài không được để trống' })
  duration: number;

  @IsString()
  @IsNotEmpty({ message: 'Ngày thi không được để trống' })
  @Matches(
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s\d{1,2}\s(January|February|March|April|May|June|July|August|September|October|November|December)$/,
    {
      message: 'Định dạng ngày không hợp lệ. Ví dụ: "Saturday, 29 March"',
    },
  )
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'Thời gian bắt đầu không được để trống' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Định dạng thời gian không hợp lệ. Ví dụ: "07:55"',
  })
  timeStart: string;

  @IsString()
  @IsNotEmpty({ message: 'Thời gian kết thúc không được để trống' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Định dạng thời gian không hợp lệ. Ví dụ: "09:55"',
  })
  timeEnd: string;
}
