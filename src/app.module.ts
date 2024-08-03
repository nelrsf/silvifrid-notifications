import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { WhatsappNotifications } from './model/WhatsappNotifications';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailNotifications } from './model/EmailNotifications';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'src', 'templates'),
    }),
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService, WhatsappNotifications, EmailNotifications],
})
export class AppModule { }
