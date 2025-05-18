import { Module } from '@nestjs/common';

import { EventAdminController } from './admin/event.controller';
import { EventAdminService } from './admin/event.service';
import { EventController } from './internal/event.controller';
import { EventService } from './internal/event.service';
import { EventApiModule } from '../api/event/event-api.module';

@Module({
  imports: [EventApiModule],
  controllers: [EventController, EventAdminController],
  providers: [EventService, EventAdminService],
})
export class EventModule {}
