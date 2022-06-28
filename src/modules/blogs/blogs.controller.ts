import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BlogsService } from './blogs.service';
import { Express, Request } from 'express';
import { diskStorage } from 'multer';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ObjectIdValidationPipe as ObjectIdValidationPipe } from 'src/common/pipes/object-id.validation.pipe';
import { JwtAuthGuard } from '../users/jwt/jwt-auth.guard';
import { AuthorizeBlogGuard } from './guards/authorize-blog.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  // get all the blogs in the store
  @Get()
  getAllBlogs() {
    return this.blogsService.getAllBlogs();
  }
  // creates a new blog in the store
  @UseGuards(JwtAuthGuard)
  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto, @Req() request: Request) {
    return this.blogsService.createBlog(createBlogDto, request);
  }
  // gets the blog for given id
  @Get(':id')
  getBlogById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.blogsService.getBlogById(id);
  }
  // updates the blog for given id
  @UseGuards(JwtAuthGuard, AuthorizeBlogGuard)
  @Patch(':id')
  updateBlogById(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogsService.updateBlogById(id, updateBlogDto);
  }
  // deletes the blog for given id
  @UseGuards(JwtAuthGuard, AuthorizeBlogGuard)
  @Delete(':id')
  deleteBlogById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.blogsService.deleteBlogById(id);
  }
  // gets the user for the given blog id
  @Get(':id/user')
  getUserByBlogId(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.blogsService.getUserByBlogId(id);
  }
  @Get('/user/:id')
  getBlogsByUserId(@Param('id') id: string) {
    return this.blogsService.getBlogsByUserId(id);
  }
  // @Post('upload')
  // @UseInterceptors(
  //   FilesInterceptor('files', 10, {
  //     storage: diskStorage({
  //       //check if uploaded file is image or not
  //       destination: './uploads',
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() files: Express.Multer.File, @Body() body: any) {
  //   // console.log(file);
  //   console.log(body);
  // }
}
