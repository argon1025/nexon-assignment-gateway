import { UserRole } from '../../common/enum/common.enum';

/** 사용자 정보 수정 옵션 */
export interface AdminUpdateUserOptions {
  /** 사용자 ID */
  id: string;
  /** 사용자 이름 */
  name?: string;
  /** 사용자 역할 */
  role?: UserRole;
}

/** 사용자 정보 수정 결과 */
export interface AdminUpdateUserResult {
  id: string;
}
