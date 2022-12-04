import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { Repository } from 'typeorm';

@Injectable()
// 第二个参数为策略名称,要和AuthGuard保持一致
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name)
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
  })

  }

  async validate(payload: any): Promise<any> {
    // payload 为 token 中存储的数据
    // console.log(payload)
    return await this.userRepository.findOne({
      where: { id: payload.id }
    })
  }
}