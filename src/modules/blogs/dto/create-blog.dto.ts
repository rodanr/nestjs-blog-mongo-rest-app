import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateBlogDto {
  @ApiProperty({ description: 'Title of the blog' })
  @IsString()
  readonly title: string;
  @ApiProperty({ description: 'Description of the body' })
  @IsString()
  readonly description: string;
}
