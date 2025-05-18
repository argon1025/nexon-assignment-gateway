import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EventApi } from './event.api';

@Module({
  imports: [HttpModule],
  providers: [EventApi],
  exports: [EventApi],
})
export class EventApiModule {}
