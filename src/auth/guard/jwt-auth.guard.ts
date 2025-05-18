import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../../common/decorator/public.decorator';
import { ERROR_CODE } from '../../common/exception/error-code';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: any) {
    // 토큰 검증 실패 시 에러 발생
    if (err || !user) {
      throw new UnauthorizedException(ERROR_CODE.INVALID_TOKEN);
    }

    return user;
  }

  canActivate(context: ExecutionContext) {
    // 인증 없이 접근 가능한지 확인
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
