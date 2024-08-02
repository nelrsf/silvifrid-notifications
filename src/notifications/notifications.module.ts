import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { WhatsappNotifications } from 'src/model/WhatsappNotifications';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: 'INotificationProvider',
      useClass: WhatsappNotifications
    }
  ],
})
export class NotificationsModule {}