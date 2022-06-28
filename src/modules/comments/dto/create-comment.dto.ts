import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'Comment to post on the blog.' })
  @IsString()
  readonly comment: string;
}
