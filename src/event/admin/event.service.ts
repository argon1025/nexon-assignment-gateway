import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  AdminCreateEventOptions,
  AdminCreateEventResult,
  AdminCreateRewardOptions,
  AdminCreateRewardResult,
  AdminGetRewardRequestsOptions,
  AdminGetRewardRequestsResult,
} from './event.interface';
import { EventApi } from '../../api/event/event.api';
import { EventApiException } from '../../api/event/event.exception';
import { ERROR_CODE } from '../../common/exception/error-code';

@Injectable()
export class EventAdminService {
  constructor(private readonly eventApi: EventApi) {}

  /** 이벤트 생성 */
  async createEvent(options: AdminCreateEventOptions): Promise<AdminCreateEventResult> {
    try {
      return await this.eventApi.createEvent(options);
    } catch (error) {
      let errorCode = '';
      let errorMessage = '';
      if (error instanceof EventApiException) {
        errorCode = error.getErrorCode();
        errorMessage = error.getMessage();
      }
      switch (errorCode) {
        // 이미 존재하는 이벤트 코드
        case 'EVENT10002': {
          throw new ConflictException(ERROR_CODE.EVENT_CODE_ALREADY_EXIST);
        }
        // 이벤트 조건 메타데이터 형식 오류
        case 'EVENT10011': {
          throw new BadRequestException({ ...ERROR_CODE.EVENT_CONDITION_METADATA_FORMAT_ERROR, message: errorMessage });
        }
        default: {
          Logger.error(`이벤트 생성 요청 처리 중 알 수 없는 오류발생`, error);
          throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }

  /** 이벤트 보상 추가 */
  async createReward(options: AdminCreateRewardOptions): Promise<AdminCreateRewardResult> {
    try {
      return await this.eventApi.createReward(options);
    } catch (error) {
      let errorCode = '';
      let errorMessage = '';
      if (error instanceof EventApiException) {
        errorCode = error.getErrorCode();
        errorMessage = error.getMessage();
      }
      switch (errorCode) {
        // 이벤트를 찾을 수 없음
        case 'EVENT10005': {
          throw new NotFoundException(ERROR_CODE.EVENT_NOT_FOUND);
        }
        // 보상 추가정보 기재 오류
        case 'EVENT20006': {
          throw new BadRequestException({
            ...ERROR_CODE.EVENT_REWARD_ADDITIONAL_INFO_FORMAT_ERROR,
            message: errorMessage,
          });
        }
        default: {
          Logger.error(`이벤트 보상 추가 요청 처리 중 알 수 없는 오류발생`, error);
          throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }

  /** 이벤트 보상 요청 목록 조회 */
  async getRewardRequests(options: AdminGetRewardRequestsOptions): Promise<AdminGetRewardRequestsResult> {
    try {
      return await this.eventApi.getAdminRewardRequests(options);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}
