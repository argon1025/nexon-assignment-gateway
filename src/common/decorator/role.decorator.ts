import { SetMetadata } from '@nestjs/common';

import { UserRole } from '../enum/common.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
