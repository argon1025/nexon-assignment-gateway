import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from '../../common/enum/common.enum';
import { ERROR_CODE } from '../../common/exception/error-code';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const userRole = user?.role;
    if (!userRole) {
      throw new ForbiddenException(ERROR_CODE.FORBIDDEN);
    }

    const hasRole = requiredRoles.includes(userRole);
    if (!hasRole) throw new ForbiddenException(ERROR_CODE.FORBIDDEN);

    return true;
  }
}
