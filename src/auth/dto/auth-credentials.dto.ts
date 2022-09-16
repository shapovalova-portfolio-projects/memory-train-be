import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class AuthCredentials {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  surname?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  nickname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: 'Password is too weak',
  })
  password: string;
}
