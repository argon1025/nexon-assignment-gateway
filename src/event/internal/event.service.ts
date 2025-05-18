import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  GetEventOptions,
  GetEventResult,
  GetEventsOptions,
  GetEventsResult,
  GetRewardRequestsOptions,
  GetRewardRequestsResult,
  RequestRewardOptions,
  RequestRewardResult,
} from './event.interface';
import { EventApi } from '../../api/event/event.api';
import { EventApiException } from '../../api/event/event.exception';
import { ERROR_CODE } from '../../common/exception/error-code';

@Injectable()
export class EventService {
  constructor(private readonly eventApi: EventApi) {}

  /** 이벤트 목록 조회 */
  async getEvents(options: GetEventsOptions): Promise<GetEventsResult> {
    try {
      return await this.eventApi.getEvents(options);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  /** 이벤트 상세 조회 */
  async getEvent(options: GetEventOptions): Promise<GetEventResult> {
    try {
      // 이벤트, 보상 목록 조회
      // TODO: 이벤트 상세 조회 API로 변경
      const [events, rewards] = await Promise.all([
        this.eventApi.getEvents({ page: 1, size: 1, id: options.id }),
        this.eventApi.getRewards({ page: 1, size: 100, eventId: options.id }),
      ]);
      const event = events.list.shift();
      if (!event) {
        throw new NotFoundException(ERROR_CODE.EVENT_NOT_FOUND);
      }

      // 이벤트 상세 조회 결과 반환
      return {
        ...event,
        rewards: rewards.list,
      };
    } catch (error) {
      throw new NotFoundException(ERROR_CODE.EVENT_NOT_FOUND);
    }
  }

  /** 리워드 요청 목록 조회 */
  async getRewardRequests(options: GetRewardRequestsOptions): Promise<GetRewardRequestsResult> {
    try {
      return await this.eventApi.getRewardRequests(options);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  /** 리워드 요청 */
  async requestReward(options: RequestRewardOptions): Promise<RequestRewardResult> {
    try {
      return await this.eventApi.requestReward(options);
    } catch (error) {
      let errorCode = '';
      if (error instanceof EventApiException) {
        errorCode = error.getErrorCode();
      }
      switch (errorCode) {
        /**
         * EVENT10005 - 이벤트를 찾을 수 없음
         * EVENT10010 - 이벤트 참여 기간이 아님
         */
        case 'EVENT10005':
        case 'EVENT10010': {
          throw new NotFoundException(ERROR_CODE.EVENT_IS_NOT_ACTIVE);
        }
        // EVENT10009 - 이벤트 조건을 만족하지 않음
        case 'EVENT10009': {
          throw new BadRequestException(ERROR_CODE.EVENT_CONDITION_NOT_MET);
        }
        // EVENT30007 - 이미 신청한 이벤트
        case 'EVENT30007': {
          throw new BadRequestException(ERROR_CODE.EVENT_ALREADY_REQUESTED);
        }
        // EVENT30010 - 신청할 수 있는 보상이 없음
        case 'EVENT30010': {
          throw new BadRequestException(ERROR_CODE.EVENT_NO_REWARD_AVAILABLE);
        }
        default: {
          Logger.error(`리워드 요청 처리 중 알 수 없는 오류발생`, error);
          throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }
}
