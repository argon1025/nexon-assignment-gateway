import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthApi } from './auth.api';

@Module({
  imports: [HttpModule],
  providers: [AuthApi],
  exports: [AuthApi],
})
export class AuthApiModule {}
