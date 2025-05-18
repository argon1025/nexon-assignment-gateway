import { RewardRequestStatus, RewardType } from '../../common/enum/common.enum';

/** 이벤트 목록 조회 옵션 */
export interface GetEventsOptions {
  page: number;
  size: number;
}

/** 이벤트 목록 조회 결과 */
export interface GetEventsResult {
  total: number;
  list: {
    /** 이벤트 ID */
    id: string;
    /** 이벤트 코드 */
    code: string;
    /** 이벤트 제목 */
    title: string;
    /** 이벤트 설명 */
    description: string;
    /** 이벤트 시작 시각 (UTC) */
    startAt: Date;
    /** 이벤트 종료 시각 (UTC) */
    endAt: Date;
    /** 이벤트 활성 여부 */
    isActive: boolean;
    /** 이벤트 생성 시각 (UTC) */
    createdAt: Date;
    /** 이벤트 수정 시각 (UTC) */
    updatedAt: Date;
  }[];
}

/** 이벤트 상세 조회 옵션 */
export interface GetEventOptions {
  id: string;
}

/** 이벤트 상세 조회 결과 */
export interface GetEventResult {
  /** 이벤트 ID */
  id: string;
  /** 이벤트 코드 */
  code: string;
  /** 이벤트 제목 */
  title: string;
  /** 이벤트 설명 */
  description: string;
  /** 이벤트 시작 시각 (UTC) */
  startAt: Date;
  /** 이벤트 종료 시각 (UTC) */
  endAt: Date;
  /** 이벤트 활성 여부 */
  isActive: boolean;
  /** 이벤트 생성 시각 (UTC) */
  createdAt: Date;
  /** 이벤트 보상 목록 */
  rewards: {
    id: string;
    /** 보상 유형 */
    type: RewardType;
    /** 수량 */
    quantity: number;
    /** 보상 제목 */
    title: string;
  }[];
}

/** 리워드 요청 목록 조회 옵션 */
export interface GetRewardRequestsOptions {
  /** 요청 사용자 ID */
  userId: string;
  /** 페이지 번호 */
  page: number;
  /** 페이지 크기 */
  size: number;
}

/** 리워드 요청 목록 조회 결과 */
export interface GetRewardRequestsResult {
  /** 보상 요청 내역 */
  list: {
    /** 보상 요청 ID */
    id: string;
    /** 이벤트 ID */
    eventId: string;
    /** 이벤트 코드 */
    eventCode: string;
    /** 보상 ID */
    rewardId: string;
    /** 보상 유형 */
    rewardType: RewardType;
    /** 보상 제목 */
    rewardTitle: string;
    /** 보상 수량 */
    rewardQuantity: number;
    /** 보상 요청 상태 */
    status: RewardRequestStatus;
    /** 마지막 처리상태 변경 사유 */
    reason: string | null;
    /** 지급 완료 시각 */
    completedAt: Date | null;
    /** 생성 시각 */
    createdAt: Date;
  }[];
  /** 보상 요청 내역 총 개수 */
  total: number;
}

/** 보상 요청 */
export interface RequestRewardOptions {
  eventId: string;
  userId: string;
}

/** 보상 요청 결과 */
export interface RequestRewardResult {
  /** 이벤트 ID */
  eventId: string;
}
