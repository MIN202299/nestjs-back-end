import { Repository } from 'typeorm';
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { Strategy } from "passport-local"
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  private readonly logger = new Logger(LocalStrategy.name);
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    
    const user: User = await this.userRepository.findOne({
      where: { username }
    })
    
    if (!user) {
      this.logger.debug(`用户 ${ username } 不存在!`); 
      throw new UnauthorizedException();
    }
    // user.password !== password
    // 这里使用了加密密码
    if (!(await bcrypt.compare(password, user.password))) {
      this.logger.debug(`用户 ${ username } 密码错误!`); 
      throw new UnauthorizedException();
    }
    
    return user;
  }
}