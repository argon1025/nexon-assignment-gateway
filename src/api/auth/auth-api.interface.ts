import { UserRole } from '../../common/enum/common.enum';

/** 사용자 생성 옵션 */
export interface CreateUserOptions {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
  /** 이름 */
  name: string;
}

/** 사용자 생성 응답 */
export interface CreateUserResponse {
  /** 생성된 사용자 ID */
  id: string;
}

/** 사용자 로그인 옵션 */
export interface LoginOptions {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
}

/** 사용자 로그인 응답 */
export interface LoginResponse {
  /** 액세스 토큰 */
  accessToken: string;
}

/** 사용자 정보 조회 */
export interface GetUserInfoOptions {
  /** 사용자 ID */
  id: string;
}

/** 사용자 정보 조회 응답 */
export interface GetUserInfoResponse {
  /** 사용자 ID */
  id: string;
  /** 이메일 */
  email: string;
  /** 이름 */
  name: string;
  /** 역할 */
  role: UserRole;
  /** 생성일시 */
  createdAt: string;
}

/** 사용자 정보 수정 */
export interface UpdateUserInfoOptions {
  /** 사용자 아이디 */
  id: string;
  /** 이름 */
  name?: string;
  /** 역할 */
  role?: UserRole;
}

/** 사용자 정보 수정 결과 */
export interface UpdateUserInfoResponse {
  /** 사용자 아이디 */
  id: string;
}
