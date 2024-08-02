import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { WhatsappNotifications } from 'src/model/WhatsappNotifications';
import * as hbs from 'hbs';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: 'INotificationProvider',
      useClass: WhatsappNotifications
    }
  ],
})
export class NotificationsModule {
  constructor() {
    hbs.registerPartials(join(__dirname,'..','..','src','templates'));
  }
}
