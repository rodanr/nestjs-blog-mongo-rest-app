import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive, IsString } from 'class-validator';

export class BlogQueryDto {
  // it represents blog_id
  @ApiProperty({ description: 'ID of the Blog where you want to post comment' })
  @IsString() // without this was showing error of blog property shouldn't exist
  blog: string;
}
