import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  CreateUserOptions,
  CreateUserResult,
  GetUserInfoResult,
  LoginUserOptions,
  LoginUserResult,
} from './user.interface';
import { AuthApi } from '../api/auth/auth.api';
import { AuthApiException } from '../api/auth/auth.exception';
import { ERROR_CODE } from '../common/exception/error-code';

@Injectable()
export class UserService {
  constructor(private readonly authApi: AuthApi) {}

  /** 회원가입 */
  async createUser(options: CreateUserOptions): Promise<CreateUserResult> {
    // 회원가입 요청
    try {
      return await this.authApi.createUser(options);
    } catch (error) {
      let errorCode = '';
      if (error instanceof AuthApiException) {
        errorCode = error.getErrorCode();
      }
      switch (errorCode) {
        // 이미 존재하는 이메일
        case 'USER00001': {
          throw new ConflictException(ERROR_CODE.USER_ALREADY_EXIST);
        }
        default: {
          Logger.error(`회원 가입 요청 처리 중 알 수 없는 오류발생`, error);
          throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }

  /** 로그인 */
  async loginUser(options: LoginUserOptions): Promise<LoginUserResult> {
    try {
      return await this.authApi.login(options);
    } catch (error) {
      let errorCode = '';
      if (error instanceof AuthApiException) {
        errorCode = error.getErrorCode();
      }
      switch (errorCode) {
        // 이메일 또는 비밀번호가 일치하지 않음
        case 'USER00003': {
          throw new UnauthorizedException(ERROR_CODE.USER_LOGIN_FAILED);
        }
        default: {
          Logger.error(`회원 로그인 요청 처리 중 알 수 없는 오류발생`, error);
          throw new UnauthorizedException(ERROR_CODE.USER_LOGIN_FAILED);
        }
      }
    }
  }

  /**
   * 고객 정보 조회
   */
  async getUserInfo(userId: string): Promise<GetUserInfoResult> {
    try {
      return await this.authApi.getUserInfo({ id: userId });
    } catch (_) {
      throw new NotFoundException(ERROR_CODE.USER_INFO_GET_FAILED);
    }
  }
}
