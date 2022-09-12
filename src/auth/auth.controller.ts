import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: AuthService
    ){}
    @Post('/signup')
    signup(@Body(new ValidationPipe()) credentials: AuthCredentials): Promise<void> {
        return this.userService.signup(credentials);
    }
    @Get('/users')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
