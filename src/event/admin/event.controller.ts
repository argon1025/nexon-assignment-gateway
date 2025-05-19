import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
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

import { ApproveRewardRequestAdminReq, ApproveRewardRequestAdminRes } from './dto/approve-reward-request.dto';
import { CreateEventAdminReq, CreateEventAdminRes } from './dto/create-event.dto';
import { CreateRewardAdminReq, CreateRewardAdminRes } from './dto/create-reward.dto';
import { GetRewardRequestsAdminReq, GetRewardRequestsAdminRes } from './dto/get-reward-requests.dto';
import { EventAdminService } from './event.service';
import { Roles } from '../../common/decorator/role.decorator';
import { User } from '../../common/decorator/user.decorator';
import { ErrorResponse } from '../../common/dto/error-response.dto';
import { UserRole } from '../../common/enum/common.enum';
import { AccessTokenPayload } from '../../common/interface/auth-payload.interface';

@ApiTags('[관리] 이벤트')
@Controller('gateway/admin/event')
@ApiBearerAuth('access-token')
export class EventAdminController {
  constructor(private readonly eventAdminService: EventAdminService) {}

  @Get('reward-request')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @ApiOperation({
    summary: '[관리자, 운영자, 감사자] 이벤트 보상 요청 목록 조회',
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

  @Patch('reward-request/:id/approve')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({
    summary: '[관리자, 운영자] 이벤트 보상 요청 승인/거절 처리',
    description: '이벤트 보상 요청 승인/거절 처리합니다.',
  })
  @ApiUnauthorizedResponse({
    description: `
    - [GATEWAY_000003] 토큰정보 유효하지 않음
    - [GATEWAY_000004] 접근 권한이 없음
    `,
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: `
    - [GATEWAY_000002] 유효하지 않은 파라미터
    - [GATEWAY_200010] 보상 요청 상태가 대기중이 아님
    `,
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({ description: '[GATEWAY_200009] 보상 요청을 찾을 수 없습니다.', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async approveRewardRequest(
    @Param('id') id: string,
    @User() user: AccessTokenPayload,
    @Body() body: ApproveRewardRequestAdminReq,
  ) {
    return plainToInstance(
      ApproveRewardRequestAdminRes,
      await this.eventAdminService.approveRewardRequest({ ...body, id, approvedUserId: user.id }),
    );
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({
    summary: '[관리자, 운영자] 이벤트 생성',
    description: '이벤트를 생성합니다.',
  })
  @ApiUnauthorizedResponse({
    description: `
    - [GATEWAY_000003] 토큰정보 유효하지 않음
    - [GATEWAY_000004] 접근 권한이 없음
    `,
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: `
    - [GATEWAY_000002] 유효하지 않은 파라미터
    - [GATEWAY_200007] 이벤트 조건 메타데이터 형식 오류
    `,
    type: ErrorResponse,
  })
  @ApiConflictResponse({ description: '[GATEWAY_200006] 이미 존재하는 이벤트 코드', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async createEvent(@Body() body: CreateEventAdminReq) {
    return plainToInstance(CreateEventAdminRes, await this.eventAdminService.createEvent(body));
  }

  @Post(':eventId/reward')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @ApiOperation({
    summary: '[관리자, 운영자] 이벤트 보상 추가',
    description: '이벤트 보상을 추가합니다.',
  })
  @ApiUnauthorizedResponse({
    description: `
    - [GATEWAY_000003] 토큰정보 유효하지 않음
    - [GATEWAY_000004] 접근 권한이 없음
    `,
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: `
    - [GATEWAY_000002] 유효하지 않은 파라미터
    - [GATEWAY_200008] 보상 추가정보 형식 오류
    `,
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({ description: '[GATEWAY_200001] 이벤트를 찾을 수 없습니다.', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: '[GATEWAY_000001] 서버 오류', type: ErrorResponse })
  async createReward(@Param('eventId') eventId: string, @Body() body: CreateRewardAdminReq) {
    return plainToInstance(CreateRewardAdminRes, await this.eventAdminService.createReward({ ...body, eventId }));
  }
}
