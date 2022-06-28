import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id.validation.pipe';
import { JwtAuthGuard } from '../users/jwt/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { BlogQueryDto } from './dto/blog-query.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
//TODO: ADD COMMENT UPDATE and CommentEditAuthorize Guard implement
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  // get all the commends of a given blog id
  @Get()
  getAllCommentsByBlogId(@Query() blogQueryDto: BlogQueryDto) {
    return this.commentsService.getAllCommentsByBlogId(blogQueryDto.blog);
  }
  // gets the single of comment of given comment id
  @Get(':id')
  getCommentByCommentId(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.commentsService.getCommentByCommentId(id);
  }
  // gets user of the given commend id
  @Get(':id/user')
  getUserByCommentId(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.commentsService.getUserByCommentId(id);
  }
  //   @Get(':id/replies')
  //   getRepliedByCommentId(@Param('id') id: string) {}

  // posts new comment for a given blog id
  @UseGuards(JwtAuthGuard)
  @Post()
  postCommentByBlogId(
    @Query() blogQueryDto: BlogQueryDto,
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: Request,
  ) {
    // return `
    // blogId: ${blogQueryDto.blog}
    // comment: ${createCommentDto.comment}
    // `;
    return this.commentsService.postCommentByBlogId(
      blogQueryDto.blog,
      createCommentDto,
      request,
    );
  }
}
