import { AuthService } from './../auth/auth.service';
import { CreateUserDto } from './dtos/user.dto';
import { Controller, Post, Body, ValidationPipe, BadRequestException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService

  ) {}

  @Post('create')
  // @Body(ValidationPipe) 单独注册dto验证
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username }
    })
    
    if (existingUser) {
      throw new BadRequestException(['用户已存在'])
    }
  
    user.username = createUserDto.username;
    user.password = await this.authService.hashPassword(createUserDto.password);
     
    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user)
    }
  }
}
