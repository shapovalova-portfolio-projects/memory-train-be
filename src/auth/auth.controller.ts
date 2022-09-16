import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtToken } from './dto/jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post('/signup')
  signup(
    @Body(new ValidationPipe()) credentials: AuthCredentials,
  ): Promise<void> {
    return this.userService.signup(credentials);
  }

  @Post('/signin')
  signin(@Body() credentials: AuthCredentials): Promise<JwtToken> {
    return this.userService.signIn(credentials);
  }

  @Get('/users')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
