import { ErrorDetail } from '../dto/error-response.dto';

/**
 * 서비스에서 리턴할 수 있는 에러 코드를 정의
 */
export const ERROR_CODE: Record<string, ErrorDetail> = {
  INTERNAL_SERVER_ERROR: { name: 'INTERNAL_SERVER_ERROR', message: '서버 오류' },
  PARAMETER_INVALID: { name: 'PARAMETER_INVALID', message: '파라미터 누락 또는 유효하지 않음' },
  INVALID_TOKEN: { name: 'INVALID_TOKEN', message: '유효하지 않은 토큰입니다.' },
  FORBIDDEN: { name: 'FORBIDDEN', message: '접근 권한이 없습니다.' },

  /** 유저 */
  USER_CREATE_FAILED: { name: 'GATEWAY_100001', message: '회원가입에 실패했습니다.' },
  USER_LOGIN_FAILED: { name: 'GATEWAY_100002', message: '로그인에 실패했습니다.' },
  USER_INFO_GET_FAILED: { name: 'GATEWAY_100003', message: '고객 정보 조회에 실패했습니다.' },
  USER_ALREADY_EXIST: { name: 'GATEWAY_100004', message: '이미 존재하는 이메일입니다.' },
  USER_NOT_FOUND: { name: 'GATEWAY_100005', message: '존재하지 않는 사용자입니다.' },
};
