import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { RewardType } from '../../../common/enum/common.enum';

@Exclude()
export class GetEventRewardItem {
  @Expose()
  @ApiProperty({ description: '보상 ID', example: 'id' })
  id: string;

  @Expose()
  @ApiProperty({ description: '보상 유형', example: 'MESO' })
  type: RewardType;

  @Expose()
  @ApiProperty({ description: '보상 수량', example: 10000 })
  quantity: number;

  @Expose()
  @ApiProperty({ description: '보상 제목', example: '1만 메소' })
  title: string;
}

@Exclude()
export class GetEventRes {
  @Expose()
  @ApiProperty({ description: '이벤트 ID', example: 'id' })
  id: string;

  @Expose()
  @ApiProperty({ description: '이벤트 코드', example: 'WELCOME-BONUS' })
  code: string;

  @Expose()
  @ApiProperty({ description: '이벤트 제목', example: '신규 가입자 보상 이벤트' })
  title: string;

  @Expose()
  @ApiProperty({ description: '이벤트 설명', example: '모두가 참여할 수 있는 이벤트!' })
  description: string;

  @Expose()
  @ApiProperty({ description: '이벤트 시작 시각 (ISO8601 UTC 형식)', example: '2025-01-01T00:00:00.000Z' })
  startAt: Date;

  @Expose()
  @ApiProperty({ description: '이벤트 종료 시각 (ISO8601 UTC 형식)', example: '2025-01-01T00:00:00.000Z' })
  endAt: Date;

  @Expose()
  @ApiProperty({ description: '이벤트 활성 여부', example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ description: '이벤트 생성 시각 (ISO8601 UTC 형식)', example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @Type(() => GetEventRewardItem)
  @ApiProperty({ description: '이벤트 보상 목록', type: [GetEventRewardItem] })
  rewards: GetEventRewardItem[];
}
