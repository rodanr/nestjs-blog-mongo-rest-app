import { IsString } from 'class-validator';
export class CreateBlogDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
}
