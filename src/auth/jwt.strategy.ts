import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from './dto/jwt.interface';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: configuration().jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { username: nickname } = payload;
    const user: User = await this.usersRepository.findOneBy({ nickname });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
