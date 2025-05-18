import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthApiModule } from '../api/auth/auth-api.module';

@Module({
  imports: [AuthApiModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
