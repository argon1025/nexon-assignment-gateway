import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { AdminUpdateUserOptions, AdminUpdateUserResult } from './user.interface';
import { AuthApi } from '../../api/auth/auth.api';
import { AuthApiException } from '../../api/auth/auth.exception';
import { ERROR_CODE } from '../../common/exception/error-code';

@Injectable()
export class UserAdminService {
  constructor(private readonly authApi: AuthApi) {}

  async updateUser(options: AdminUpdateUserOptions): Promise<AdminUpdateUserResult> {
    try {
      return await this.authApi.updateUserInfo(options);
    } catch (error) {
      let errorCode = '';
      if (error instanceof AuthApiException) {
        errorCode = error.getErrorCode();
      }
      switch (errorCode) {
        // 존재하지 않는 사용자
        case 'USER00004': {
          throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
        }
        default: {
          Logger.error(`회원 정보 수정 중 알 수 없는 오류발생`, error);
          throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }
}
