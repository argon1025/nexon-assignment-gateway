import { UserRole } from '../enum/common.enum';

export interface AccessTokenPayload {
  id: string;
  email: string;
  role: UserRole;
}
