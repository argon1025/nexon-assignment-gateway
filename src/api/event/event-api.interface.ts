import { EventConditionType, RewardRequestStatus, RewardType } from '../../common/enum/common.enum';

/** 이벤트 목록 조회 옵션 */
export interface GetEventsOptions {
  page: number;
  size: number;
  /** 이벤트 ID */
  id?: string;
}

/** 이벤트 목록 조회 결과 */
export interface GetEventsResponse {
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

/** 보상 목록 조회 */
export interface GetRewardsOptions {
  /** 페이지 번호 */
  page: number;
  /** 페이지 크기 */
  size: number;
  /** 이벤트 코드 */
  eventCode?: string;
  /** 이벤트 ID */
  eventId?: string;
}

/** 보상 목록 조회 응답 */
export interface GetRewardsResponse {
  total: number;
  list: {
    id: string;
    /** 연결된 이벤트 ID */
    eventId: string;
    /** 연결된 이벤트 코드 */
    eventCode: string;
    /** 보상 유형 */
    type: RewardType;
    /** 수량 */
    quantity: number;
    /** 보상 제목 */
    title: string;
    /** 보상 추가정보 */
    additionalInfo: string | null;
    /** 생성 시각 */
    createdAt: Date;
    /** 수정 시각 */
    updatedAt: Date;
  }[];
}

export interface RequestRewardOptions {
  /** 요청 사용자 ID */
  userId: string;
  /** 요청 이벤트 ID */
  eventId: string;
}

export interface RequestRewardResponse {
  /** 요청 이벤트 ID */
  eventId: string;
}

export interface GetRewardRequestsOptions {
  /** 요청 사용자 ID */
  userId: string;
  /** 페이지 번호 */
  page: number;
  /** 페이지 크기 */
  size: number;
}

export interface GetRewardRequestsResponse {
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
    /** 보상 추가정보 */
    rewardAdditionalInfo: string | null;
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

/** 이벤트 생성 옵션 */
export interface CreateEventOptions {
  /** 이벤트 코드 */
  code: string;

  /** 이벤트 제목 */
  title: string;

  /** 이벤트 설명 */
  description: string;

  /** 이벤트 참여 조건 */
  condition: {
    type: EventConditionType;
    metadata: Record<string, any>;
  } | null;

  /** 이벤트 시작 시각 (UTC) */
  startAt: Date;

  /** 이벤트 종료 시각 (UTC) */
  endAt: Date;

  /** 이벤트 활성 여부 */
  isActive: boolean;
}

/** 이벤트 생성 결과 */
export interface CreateEventResponse {
  /** 이벤트 ID */
  id: string;
}

/** 보상 생성 옵션 */
export interface CreateRewardOptions {
  /** 이벤트 ID */
  eventId: string;
  /** 보상 타입 */
  type: RewardType;
  /** 수량 */
  quantity: number;
  /** 보상 제목 */
  title: string;
  /** 보상 추가정보 */
  additionalInfo: string | null;
  /** 운영자 승인 필요 여부 */
  isApprovalRequired: boolean;
}

/** 보상 생성 결과 */
export interface CreateRewardResponse {
  /** 보상 ID */
  id: string;
}

/** 관리자 보상 요청 내역 조회 옵션 */
export interface GetAdminRewardRequestsOptions {
  /** 페이지 번호 */
  page: number;
  /** 페이지 크기 */
  size: number;
  /** 이벤트 ID */
  eventId?: string;
  /** 이벤트 코드 */
  eventCode?: string;
  /** 고객 ID */
  userId?: string;
  /** 보상 요청 상태 */
  status?: RewardRequestStatus;
}

/** 관리자 보상 요청 내역 조회 응답 */
export interface GetAdminRewardRequestsResponse {
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
    /** 보상 추가정보 */
    rewardAdditionalInfo: string | null;
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
