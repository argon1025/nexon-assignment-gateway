import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AccessTokenPayload } from '../interface/auth-payload.interface';

export const User = createParamDecorator((data: keyof AccessTokenPayload | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;

  return data ? user?.[data] : user;
});
