import { CreateCommentDto } from './create-comment.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
