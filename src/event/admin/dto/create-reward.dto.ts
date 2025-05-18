import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { RewardType } from '../../../common/enum/common.enum';

export class CreateRewardAdminReq {
  @IsNotEmpty()
  @IsEnum(RewardType)
  @ApiProperty({ description: '보상 타입' })
  type: RewardType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '보상 수량' })
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '보상 제목', example: '환영 보상' })
  title: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: '보상 지급 시 운영자 승인 필요 여부', default: false })
  isApprovalRequired: boolean = false;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '보상 추가정보', default: null })
  additionalInfo: string | null = null;
}

@Exclude()
export class CreateRewardAdminRes {
  @Expose()
  @ApiProperty({ description: '생성된 보상 ID', example: '68285f609f967e5762d8801d' })
  id: string;
}
