import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { WhatsappNotifications } from 'src/model/WhatsappNotifications';
import { HandlebarsProvider } from './handlebars.provider';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: 'INotificationProvider',
      useClass: WhatsappNotifications
    },
    HandlebarsProvider
  ],
})
export class NotificationsModule {}