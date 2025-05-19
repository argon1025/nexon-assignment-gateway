import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

import { RewardRequestStatus } from '../../../common/enum/common.enum';

export class ApproveRewardRequestAdminReq {
  @IsEnum([RewardRequestStatus.REJECTED, RewardRequestStatus.PENDING])
  @IsNotEmpty()
  @ApiProperty({
    description: '변경할 보상 요청 상태',
    enum: [RewardRequestStatus.REJECTED, RewardRequestStatus.PENDING],
  })
  status: RewardRequestStatus.REJECTED | RewardRequestStatus.PENDING;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '변경 사유', example: '승인 취소' })
  reason: string;
}

@Exclude()
export class ApproveRewardRequestAdminRes {
  @Expose()
  @ApiProperty({
    description: '업데이트된 보상 요청 ID',
    example: '6644a32a6265492bc2a44b21',
  })
  id: string;
}
