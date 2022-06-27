import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true, minlength: 3 })
  username: string;
  @Prop({ unique: true })
  email: string;
  @Prop({ minlength: 8 })
  password: string;
  @Prop()
  firstName: string;
  @Prop()
  middleName: string;
  @Prop()
  lastName: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
