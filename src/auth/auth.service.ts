import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KEY_ALREADY_EXISTS } from 'src/constants';
import { Repository } from 'typeorm';

import { AuthCredentials } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }
    async signup(credentials: AuthCredentials): Promise<void> {
        const { nickname, password, name, surname } = credentials;
        const user = this.usersRepository.create({ nickname, password, name, surname });
        try {
            await this.usersRepository.save(user);
        } catch (error) {
            if (error.code === KEY_ALREADY_EXISTS) {
                throw new ConflictException('User already exists');
            }
            throw InternalServerErrorException;
        }
    }
    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }
}
