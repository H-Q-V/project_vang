import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({})
  password: string;

  @Prop({})
  salt: string;

  // @Prop({ enum: ['0', '1'], required: false })
  // role: string;
  //0: teacher, 1: student

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  profileImage?: string;

  @Prop({ default: [] })
  subjects: string[];

  @Prop()
  phoneNumber?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
