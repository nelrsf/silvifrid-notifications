import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { INotificationProvider } from 'src/model/INotificationProvider';
import { WhatsappNotifications } from 'src/model/WhatsappNotifications';

@Controller('notifications')
export class NotificationsController {
  constructor(@Inject('INotificationProvider')private readonly notificationsProvider: INotificationProvider) {}

  @Post("/send")
  sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsProvider.sendNotification(createNotificationDto.message);
  }

  @Get("/initializewp")
  initialize() {
    try {
      (this.notificationsProvider as WhatsappNotifications).initializeClient();
      return "inicializado correctamente"
    } catch (e) {
      return e;
    }

  }


}
