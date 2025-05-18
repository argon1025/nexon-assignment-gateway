import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsEnum, IsObject, IsString, IsNotEmpty, IsDateString, IsOptional, IsBoolean } from 'class-validator';

import { EventConditionType } from '../../../common/enum/common.enum';

export class CreateEventConditionAdminReq {
  @IsEnum(EventConditionType)
  @ApiProperty({ description: '이벤트 참여 조건 타입' })
  type: EventConditionType;

  @IsObject()
  @ApiProperty({
    description: '이벤트 참여 조건 메타데이터',
    type: Object,
  })
  metadata: Record<string, any>;
}

export class CreateEventAdminReq {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '이벤트 코드 (고유값)', example: 'WELCOME-BONUS' })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '이벤트 제목', example: '신규 가입자 보상 이벤트' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '이벤트 설명', example: '모두가 참여할 수 있는 이벤트!' })
  description: string;

  @Type(() => CreateEventConditionAdminReq)
  @ApiProperty({
    description: '이벤트 참여 조건 (null이면 무조건 참여 가능)',
    default: null,
    type: CreateEventConditionAdminReq,
    example: { type: 'TEST_CONDITION', metadata: { key: 'value' } },
  })
  condition: CreateEventConditionAdminReq | null = null;

  @IsDateString()
  @ApiProperty({ description: '이벤트 시작 시각 (ISO8601 UTC 형식)', example: '2025-06-01T00:00:00Z' })
  startAt: Date;

  @IsDateString()
  @ApiProperty({ description: '이벤트 종료 시각 (ISO8601 UTC 형식)', example: '2025-06-30T23:59:59Z' })
  endAt: Date;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: '이벤트 활성 여부 (기본값 true)', default: true })
  isActive: boolean = true;
}

@Exclude()
export class CreateEventAdminRes {
  @Expose()
  @ApiProperty({ description: '생성된 이벤트 ID' })
  id: string;
}
