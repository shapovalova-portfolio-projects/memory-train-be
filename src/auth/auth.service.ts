import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KEY_ALREADY_EXISTS } from 'src/constants';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentials } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import { JwtPayload, JwtToken } from './dto/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signup(credentials: AuthCredentials): Promise<void> {
    const { nickname, password, name, surname } = credentials;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      nickname,
      password: hashedPassword,
      name,
      surname,
    });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === KEY_ALREADY_EXISTS) {
        throw new ConflictException('User already exists');
      }
      throw InternalServerErrorException;
    }
  }
  async signIn(credentials: AuthCredentials): Promise<JwtToken> {
    const { nickname, password } = credentials;
    const user = await this.usersRepository.findOneBy({ nickname });
    if (user && (await bcrypt.compare(password, user.password))) {
      const jwtPayload: JwtPayload = { username: nickname };
      const token = await this.jwtService.sign(jwtPayload);
      return { token };
    } else {
      throw new UnauthorizedException('Please check login or password');
    }
  }
  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
