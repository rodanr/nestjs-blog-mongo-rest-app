import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Blog extends Document {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  author: string;
  @Prop()
  user_id: string;
  @Prop({ type: Date })
  created_at: Date;
  @Prop()
  last_updated_at: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
