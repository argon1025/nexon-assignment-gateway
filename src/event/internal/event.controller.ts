import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { GetEventRes } from './dto/get-event.dto';
import { GetEventsReq, GetEventsRes } from './dto/get-events.dto';
import { GetRewardRequestsReq, GetRewardRequestsRes } from './dto/get-reward-requests.dto';
import { RequestRewardRes } from './dto/request-reward.dto';
import { EventService } from './event.service';
import { Public } from '../../common/decorator/public.decorator';
import { Roles } from '../../common/decorator/role.decorator';
import { User } from '../../common/decorator/user.decorator';
import { ErrorResponse } from '../../common/dto/error-response.dto';
import { UserRole } from '../../common/enum/common.enum';
import { AccessTokenPayload } from '../../common/interface/auth-payload.interface';

@ApiTags('이벤트')
@Controller('gateway/event')
@ApiBearerAuth('access-token')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @Public()
  @ApiOperation({
    summary: '이벤트 목록 조회',
    description: '이벤트 목록을 조회합니다.',
  })
  @ApiBadRequestResponse({ description: '[GATEWAY_000002] 유효하지 않은 파라미터', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async getEvents(@Query() query: GetEventsReq) {
    return plainToInstance(GetEventsRes, await this.eventService.getEvents(query));
  }

  @Get('reward-request')
  @ApiOperation({
    summary: '리워드 요청 목록 조회',
    description: '리워드 요청 목록을 조회합니다.',
  })
  @ApiBadRequestResponse({ description: '[GATEWAY_000002] 유효하지 않은 파라미터', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async getRewardRequests(@Query() query: GetRewardRequestsReq, @User() user: AccessTokenPayload) {
    return plainToInstance(
      GetRewardRequestsRes,
      await this.eventService.getRewardRequests({
        ...query,
        userId: user.id,
      }),
    );
  }

  @Get(':eventId')
  @Public()
  @ApiOperation({
    summary: '이벤트 상세 조회',
    description: '이벤트 상세를 조회합니다.',
  })
  @ApiBadRequestResponse({ description: '[GATEWAY_000002] 유효하지 않은 파라미터', type: ErrorResponse })
  @ApiNotFoundResponse({ description: '[GATEWAY_200001] 이벤트를 찾을 수 없습니다.', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async getEvent(@Param('eventId') eventId: string) {
    return plainToInstance(GetEventRes, await this.eventService.getEvent({ id: eventId }));
  }

  @Roles(UserRole.USER)
  @Post(':eventId/reward-request')
  @ApiOperation({
    summary: '리워드 요청',
    description: '리워드를 요청합니다.',
  })
  @ApiForbiddenResponse({ description: '[GATEWAY_000004] 접근 권한이 없습니다.', type: ErrorResponse })
  @ApiUnauthorizedResponse({ description: '[GATEWAY_000003] 유효하지 않은 토큰', type: ErrorResponse })
  @ApiNotFoundResponse({ description: '[GATEWAY_200002] 이벤트가 진행중이 아님', type: ErrorResponse })
  @ApiBadRequestResponse({
    description: `
    - [GATEWAY_000002] 유효하지 않은 파라미터
    - [GATEWAY_200003] 이벤트 조건을 만족하지 않음
    - [GATEWAY_200004] 이미 신청한 이벤트
    - [GATEWAY_200005] 신청할 수 있는 보상이 없음
      `,
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async requestReward(@Param('eventId') eventId: string, @User() user: AccessTokenPayload) {
    return plainToInstance(RequestRewardRes, await this.eventService.requestReward({ eventId, userId: user.id }));
  }
}
