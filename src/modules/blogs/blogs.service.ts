import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly BlogModel: Model<Blog>,
    private readonly userService: UsersService,
  ) {}
  getAllBlogs() {
    return this.BlogModel.find().exec();
  }
  async createBlog(createBlogDto: CreateBlogDto, request: Request) {
    const user = await this.userService.getUserFromJwtTokenInRequest(request);
    const blog = new this.BlogModel({
      user_id: user._id,
      author: `${user.firstName} ${user.lastName}`,
      created_at: +new Date(),
      last_updated_at: +new Date(),
      ...createBlogDto,
    });
    return blog.save();
  }
  async getBlogById(id: string) {
    const blog = await this.BlogModel.findOne({ _id: id }).exec();
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return blog;
  }
  async updateBlogById(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.BlogModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateBlogDto, last_updated_at: +new Date() } },
      { new: true },
    ).exec();
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return blog;
  }
  async deleteBlogById(id: string) {
    const blog = await this.getBlogById(id);
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return blog.remove();
  }
  async getUserByBlogId(id: string) {
    const blog = await this.getBlogById(id);
    const user = await this.userService.getUserByUserId(blog.user_id);
    return user;
  }
  async getBlogsByUserId(id: string) {
    const blogs = await this.BlogModel.find({ user_id: id }).exec();
    if (!blogs || blogs.length === 0) {
      throw new NotFoundException(`User #${id} hasn't posted any blogs`);
    }
    return blogs;
  }
}
