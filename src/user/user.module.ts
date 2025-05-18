import { Module } from '@nestjs/common';

import { UserAdminController } from './admin/user.controller';
import { UserAdminService } from './admin/user.service';
import { UserController } from './internal/user.controller';
import { UserService } from './internal/user.service';
import { AuthApiModule } from '../api/auth/auth-api.module';

@Module({
  imports: [AuthApiModule],
  controllers: [UserController, UserAdminController],
  providers: [UserService, UserAdminService],
})
export class UserModule {}
