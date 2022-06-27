import { CreateCommentDto } from './create-comment.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
