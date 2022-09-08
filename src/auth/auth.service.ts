import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        console.log(credentials);
        
        const { nickname, password, name, surname } = credentials;
        const user = this.usersRepository.create({ nickname, password, name, surname });
        this.usersRepository.save(user);
    }
    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }
}
