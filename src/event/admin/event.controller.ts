import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreateEventAdminReq, CreateEventAdminRes } from './dto/create-event.dto';
import { CreateRewardAdminReq, CreateRewardAdminRes } from './dto/create-reward.dto';
import { GetRewardRequestsAdminReq, GetRewardRequestsAdminRes } from './dto/get-reward-requests.dto';
import { EventAdminService } from './event.service';
import { Roles } from '../../common/decorator/role.decorator';
import { ErrorResponse } from '../../common/dto/error-response.dto';
import { UserRole } from '../../common/enum/common.enum';

@ApiTags('[관리] 이벤트')
@Controller('gateway/admin/event')
@ApiBearerAuth('access-token')
export class EventAdminController {
  constructor(private readonly eventAdminService: EventAdminService) {}

  @Get('reward-request')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({
    summary: '이벤트 보상 요청 목록 조회',
    description: '이벤트 보상 요청 목록을 조회합니다.',
  })
  @ApiUnauthorizedResponse({
    description: `
    - [GATEWAY_000003] 토큰정보 유효하지 않음
    - [GATEWAY_000004] 접근 권한이 없음
    `,
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({ description: '[GATEWAY_000002] 유효하지 않은 파라미터', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async getRewardRequests(@Query() query: GetRewardRequestsAdminReq) {
    return plainToInstance(GetRewardRequestsAdminRes, await this.eventAdminService.getRewardRequests(query));
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({
    summary: '이벤트 생성',
    description: '이벤트를 생성합니다.',
  })
  @ApiUnauthorizedResponse({
    description: `
    - [GATEWAY_000003] 토큰정보 유효하지 않음
    - [GATEWAY_000004] 접근 권한이 없음
    `,
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({ description: '[GATEWAY_000002] 유효하지 않은 파라미터', type: ErrorResponse })
  @ApiConflictResponse({ description: '[GATEWAY_200006] 이미 존재하는 이벤트 코드', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async createEvent(@Body() body: CreateEventAdminReq) {
    return plainToInstance(CreateEventAdminRes, await this.eventAdminService.createEvent(body));
  }

  @Post(':eventId/reward')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({
    summary: '이벤트 보상 추가',
    description: '이벤트 보상을 추가합니다.',
  })
  @ApiUnauthorizedResponse({
    description: `
    - [GATEWAY_000003] 토큰정보 유효하지 않음
    - [GATEWAY_000004] 접근 권한이 없음
    `,
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({ description: '[GATEWAY_200001] 이벤트를 찾을 수 없습니다.', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async createReward(@Param('eventId') eventId: string, @Body() body: CreateRewardAdminReq) {
    return plainToInstance(CreateRewardAdminRes, await this.eventAdminService.createReward({ ...body, eventId }));
  }
}
