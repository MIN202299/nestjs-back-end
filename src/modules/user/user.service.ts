import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async findUserByName(username: string): Promise<User|undefined> {
    const user: User = await this.repository.findOne({
      where: { username }
    })
    if (!user) {
      // 不存在用户抛出异常
      throw new NotFoundException();
    }
    return user;
  }
  
}