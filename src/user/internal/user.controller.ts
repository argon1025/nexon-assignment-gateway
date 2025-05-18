import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateUserReq, CreateUserRes } from './dto/create-user.dto';
import { GetUserRes } from './dto/get-user.dto';
import { LoginUserReq, LoginUserRes } from './dto/login-user.dto';
import { UserService } from './user.service';
import { Public } from '../../common/decorator/public.decorator';
import { User } from '../../common/decorator/user.decorator';
import { ErrorResponse } from '../../common/dto/error-response.dto';
import { AccessTokenPayload } from '../../common/interface/auth-payload.interface';

@ApiTags('사용자')
@Controller('gateway/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: '회원가입',
    description: '이메일과 비밀번호를 입력하여 회원가입합니다.',
  })
  @ApiBadRequestResponse({ description: '[PARAMETER_INVALID] 유효하지 않은 파라미터', type: ErrorResponse })
  @ApiConflictResponse({ description: '[GATEWAY_100004] 이미 존재하는 이메일', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[INTERNAL_SERVER_ERROR] 서버 오류', type: ErrorResponse })
  async CreateUserReq(@Body() body: CreateUserReq) {
    return plainToInstance(CreateUserRes, await this.userService.createUser(body));
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호를 입력하여 로그인합니다.',
  })
  @ApiUnauthorizedResponse({ description: '[GATEWAY_100002] 로그인 실패', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[INTERNAL_SERVER_ERROR] 서버 오류', type: ErrorResponse })
  async loginUser(@Body() body: LoginUserReq) {
    return plainToInstance(LoginUserRes, await this.userService.loginUser(body));
  }

  @Get()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '내 정보 조회',
    description: '현재 로그인한 사용자의 정보를 조회합니다.',
  })
  @ApiUnauthorizedResponse({ description: '[INVALID_TOKEN] 토큰정보 유효하지 않음', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[INTERNAL_SERVER_ERROR] 서버 오류', type: ErrorResponse })
  async getMe(@User() user: AccessTokenPayload) {
    return plainToInstance(GetUserRes, await this.userService.getUserInfo(user.id));
  }
}
