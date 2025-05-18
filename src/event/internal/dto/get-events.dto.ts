import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class GetEventsReq {
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
export class GetEventsItemRes {
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
  @ApiProperty({ description: '이벤트 수정 시각 (ISO8601 UTC 형식)', example: '2025-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

@Exclude()
export class GetEventsRes {
  @Expose()
  @Type(() => GetEventsItemRes)
  @ApiProperty({ description: '이벤트 목록', type: [GetEventsItemRes] })
  list: GetEventsItemRes[];

  @Expose()
  @ApiProperty({ description: '총 이벤트 수', example: 100 })
  total: number;
}
