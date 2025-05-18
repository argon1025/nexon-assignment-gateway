import { Module } from '@nestjs/common';

import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventApiModule } from '../../api/event/event-api.module';

@Module({
  imports: [EventApiModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
