import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserReq {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ description: '비밀번호 (8자 이상 20자 이하)', example: 'password' })
  password: string;
}

@Exclude()
export class LoginUserRes {
  @Expose()
  @ApiProperty({ description: '액세스 토큰', example: 'access_token' })
  accessToken: string;
}
