import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [JwtStrategy],
})
export class AuthModule {}
