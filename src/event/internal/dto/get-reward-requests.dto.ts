import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

import { RewardRequestStatus, RewardType } from '../../../common/enum/common.enum';

export class GetRewardRequestsReq {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: '페이지 번호', example: 1, type: Number })
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: '페이지 크기', example: 10, type: Number })
  size: number;
}

@Exclude()
export class GetRewardRequestsListItem {
  @Expose()
  @ApiProperty({ description: '보상 요청 ID' })
  id: string;

  @Expose()
  @ApiProperty({ description: '이벤트 ID' })
  eventId: string;

  @Expose()
  @ApiProperty({ description: '이벤트 코드', example: 'WELCOME-BONUS' })
  eventCode: string;

  @Expose()
  @ApiProperty({ description: '보상 ID' })
  rewardId: string;

  @Expose()
  @ApiProperty({ description: '보상 유형' })
  rewardType: RewardType;

  @Expose()
  @ApiProperty({ description: '보상 제목', example: '환영 보상' })
  rewardTitle: string;

  @Expose()
  @ApiProperty({ description: '보상 수량' })
  rewardQuantity: number;

  @Expose()
  @ApiProperty({ description: '보상 요청 상태' })
  status: RewardRequestStatus;

  @Expose()
  @ApiProperty({ description: '마지막 처리상태 변경 사유' })
  reason: string | null;

  @Expose()
  @ApiProperty({ description: '지급 완료 시각' })
  completedAt: Date | null;

  @Expose()
  @ApiProperty({ description: '생성 시각' })
  createdAt: Date;
}

@Exclude()
export class GetRewardRequestsRes {
  @Expose()
  @Type(() => GetRewardRequestsListItem)
  @ApiProperty({ description: '보상 요청 내역' })
  list: GetRewardRequestsListItem[];

  @Expose()
  @ApiProperty({ description: '보상 요청 내역 총 개수' })
  total: number;
}
