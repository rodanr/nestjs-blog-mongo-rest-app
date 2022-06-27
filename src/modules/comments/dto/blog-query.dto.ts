import { Type } from 'class-transformer';
import { IsPositive, IsString } from 'class-validator';

export class BlogQueryDto {
  // it represents blog_id
  @IsString() // without this was showing error of blog property shouldn't exist
  blog: string;
}
