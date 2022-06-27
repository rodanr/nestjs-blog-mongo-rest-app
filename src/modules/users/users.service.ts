import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  //temp method
  getAllUsers() {
    return this.UserModel.find({}, { password: false }).exec();
  }
  signup(createUserDto: CreateUserDto) {
    const user = new this.UserModel(createUserDto);
    return user
      .save()
      .then((user) => user)
      .catch((error) => {
        const errorKeyValue = error.keyValue;
        if (errorKeyValue.username) {
          throw new BadRequestException('Username already exists');
        }
        if (errorKeyValue.email) {
          throw new BadRequestException('Email is already used');
        }
      });
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.UserModel.findOne({
      username: loginUserDto.username,
    }).exec();
    if (!user || !(user.password === loginUserDto.password)) {
      throw new NotFoundException(`Invalid credentials`);
    }
    const jwt = await this.jwtService.signAsync({
      username: user.username,
      sub: user._id,
    });
    return {
      msg: 'Logged in Successfully',
      jwt: jwt,
    };
  }
  async updateUserByUserId(id: string, updateUserDto: UpdateUserDto) {
    try {
      // fix the redundancy to update the new email same as existing one in frontend side
      const user = await this.UserModel.findOneAndUpdate(
        { _id: id },
        { $set: updateUserDto },
        { new: true },
      ).exec();
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    } catch (error) {
      if (error.keyValue.email) {
        throw new BadRequestException('Email is already used');
      }
    }
  }
  //helper method
  async getUserByUserId(id: string) {
    const user = await this.UserModel.findOne(
      {
        _id: id,
      },
      { password: false },
    ).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  //helper method
  async getUserFromJwtTokenInRequest(request: Request) {
    const jwtReceived = request.headers.authorization.replace('Bearer ', '');
    const jwtService = new JwtService();
    const decoded = jwtService.decode(jwtReceived, { json: true });
    const user = await this.getUserByUserId(decoded['sub']);
    return user;
  }
}
