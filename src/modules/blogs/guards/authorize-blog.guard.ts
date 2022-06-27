import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import { BlogsService } from '../blogs.service';

@Injectable()
export class AuthorizeBlogGuard implements CanActivate {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const userFromJWT = await this.usersService.getUserFromJwtTokenInRequest(
      request,
    );
    const blogIdFromParam = request.params.id;
    const userFromBlog = await this.blogsService.getUserByBlogId(
      blogIdFromParam,
    );

    // console.log(userIdFromParam);
    // userId decoded should match the userId the user is trying to modify
    console.log(userFromJWT._id, userFromBlog._id);

    return userFromJWT._id.toString() === userFromBlog._id.toString();
  }
}
