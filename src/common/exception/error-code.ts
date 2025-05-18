import { ErrorDetail } from '../dto/error-response.dto';

/**
 * 서비스에서 리턴할 수 있는 에러 코드를 정의
 */
export const ERROR_CODE: Record<string, ErrorDetail> = {
  /** 공통 에러 */
  INTERNAL_SERVER_ERROR: { name: 'GATEWAY_000001', message: '서버 오류' },
  PARAMETER_INVALID: { name: 'GATEWAY_000002', message: '파라미터 누락 또는 유효하지 않음' },
  INVALID_TOKEN: { name: 'GATEWAY_000003', message: '유효하지 않은 토큰입니다.' },
  FORBIDDEN: { name: 'GATEWAY_000004', message: '접근 권한이 없습니다.' },

  /** 유저 */
  USER_CREATE_FAILED: { name: 'GATEWAY_100001', message: '회원가입에 실패했습니다.' },
  USER_LOGIN_FAILED: { name: 'GATEWAY_100002', message: '로그인에 실패했습니다.' },
  USER_INFO_GET_FAILED: { name: 'GATEWAY_100003', message: '고객 정보 조회에 실패했습니다.' },
  USER_ALREADY_EXIST: { name: 'GATEWAY_100004', message: '이미 존재하는 이메일입니다.' },
  USER_NOT_FOUND: { name: 'GATEWAY_100005', message: '존재하지 않는 사용자입니다.' },

  /** 이벤트 */
  EVENT_NOT_FOUND: { name: 'GATEWAY_200001', message: '이벤트를 찾을 수 없습니다.' },
  EVENT_IS_NOT_ACTIVE: { name: 'GATEWAY_200002', message: '이벤트가 진행중이 아닙니다.' },
  EVENT_CONDITION_NOT_MET: { name: 'GATEWAY_200003', message: '이벤트 조건을 만족하지 않습니다.' },
  EVENT_ALREADY_REQUESTED: { name: 'GATEWAY_200004', message: '이미 신청한 이벤트입니다.' },
  EVENT_NO_REWARD_AVAILABLE: { name: 'GATEWAY_200005', message: '신청할 수 있는 보상이 없습니다.' },
  EVENT_CODE_ALREADY_EXIST: { name: 'GATEWAY_200006', message: '이미 존재하는 이벤트 코드입니다.' },
};
