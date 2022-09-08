import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: AuthService
    ){}
    @Post('/signup')
    signup(@Body() credentials: AuthCredentials): Promise<void> {
        console.log(credentials);
        
        return this.userService.signup(credentials);
    }
    @Get('/users')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
