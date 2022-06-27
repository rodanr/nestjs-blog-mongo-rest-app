import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { isValidObjectId, Model } from 'mongoose';
import { BlogsService } from '../blogs/blogs.service';
import { UsersService } from '../users/users.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly CommentModel: Model<Comment>,
    private readonly userService: UsersService,
    private readonly blogService: BlogsService,
  ) {}
  async getAllCommentsByBlogId(id: string) {
    const comments = await this.CommentModel.find({
      blog_id: id,
    }).exec();
    return comments;
  }
  async getCommentByCommentId(id: string) {
    const comment = await this.CommentModel.findOne({
      _id: id,
    }).exec();
    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return comment;
  }
  async getUserByCommentId(id: string) {
    const comment = await this.getCommentByCommentId(id);
    const user = await this.userService.getUserByUserId(comment.user_id);
    // no need to check if user exist as at the time of comment creation it is presence of user is already checked
    // also the method we are calling checks if user exists
    return user;
  }
  async postCommentByBlogId(
    id: string,
    createCommentDto: CreateCommentDto,
    request: Request,
  ) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Id Passed');
    }
    // no need to check blog exists since method contains that
    // also throws error if blog doesn't exist
    // checking if blog exists
    await this.blogService.getBlogById(id);
    const user = await this.userService.getUserFromJwtTokenInRequest(request);
    const comment = new this.CommentModel({
      blog_id: id,
      user_id: user._id,
      username: user.username,
      ...createCommentDto,
    });
    return comment.save();
  }
}
