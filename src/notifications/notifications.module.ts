import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { WhatsappNotifications } from 'src/model/WhatsappNotifications';
import { EmailNotifications } from 'src/model/EmailNotifications';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: 'INotificationProvider',
      useClass: EmailNotifications
    }
  ],
})
export class NotificationsModule {}