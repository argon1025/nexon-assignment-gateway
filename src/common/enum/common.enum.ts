/**
 * 사용자 역할
 */
export enum UserRole {
  /** 관리자 */
  ADMIN = 'ADMIN',
  /** 운영자 */
  OPERATOR = 'OPERATOR',
  /** 감사자 */
  AUDITOR = 'AUDITOR',
  /** 사용자 */
  USER = 'USER',
}

/** 이벤트 조건 유형 */
export enum EventConditionType {
  /** 특정 퀘스트 클리어 */
  QUEST_CLEAR = 'QUEST_CLEAR',
  /** 연속 출석 */
  CONTINUOUS_ATTENDANCE = 'CONTINUOUS_ATTENDANCE',
  /** 친구 초대 */
  FRIEND_INVITATION = 'FRIEND_INVITATION',
}

/** 이벤트 보상 유형 */
export enum RewardType {
  /** 메소 */
  MESO = 'MESO',
  /** 캐시 */
  CASH = 'CASH',
  /** 아이템 */
  ITEM = 'ITEM',
  /** 쿠폰 */
  COUPON = 'COUPON',
}

/** 이벤트 보상 지급처리 상태 */
export enum RewardRequestStatus {
  /** 유저가 요청 후 처리 대기중 */
  PENDING = 'PENDING',
  /** 시스템이 처리 중 */
  PROCESSING = 'PROCESSING',
  /** 관리자 승인 대기 */
  WAITING_APPROVAL = 'WAITING_APPROVAL',
  /** 보상 지급 완료 */
  COMPLETED = 'COMPLETED',
  /** 관리자 승인 거절 */
  REJECTED = 'REJECTED',
  /** 지급 처리 중 오류 발생 */
  FAILED = 'FAILED',
}
