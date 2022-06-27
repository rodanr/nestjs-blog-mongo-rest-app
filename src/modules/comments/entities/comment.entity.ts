import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop()
  //check if it exists before storing
  blog_id: string;
  @Prop()
  comment: string;
  @Prop()
  user_id: string;
  @Prop()
  username: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
