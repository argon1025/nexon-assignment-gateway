import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RequestRewardRes {
  @Expose()
  @ApiProperty({ description: '접수 완료된 이벤트 ID', example: 'id' })
  eventId: string;
}
