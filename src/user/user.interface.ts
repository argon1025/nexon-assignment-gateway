import { UserRole } from '../common/enum/common.enum';

/** 회원가입 옵션 */
export interface CreateUserOptions {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
  /** 이름 */
  name: string;
}

/** 회원가입 결과 */
export interface CreateUserResult {
  /** 유저 아이디 */
  id: string;
}

/** 로그인 옵션 */
export interface LoginUserOptions {
  /** 이메일 */
  email: string;
  /** 비밀번호 */
  password: string;
}

/** 로그인 결과 */
export interface LoginUserResult {
  /** 액세스 토큰 */
  accessToken: string;
  /** TODO: 리프레시 토큰 */
}

/** 유저 정보 조회 결과 */
export interface GetUserInfoResult {
  /** 유저 아이디 */
  id: string;
  /** 이메일 */
  email: string;
  /** 이름 */
  name: string;
  /** 역할 */
  role: UserRole;
}
