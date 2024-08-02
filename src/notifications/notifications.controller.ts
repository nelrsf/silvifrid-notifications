import { Controller, Get, Post, Body, Inject, Render, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { INotificationProvider } from 'src/model/INotificationProvider';
import { WhatsappNotifications } from 'src/model/WhatsappNotifications';

@Controller('notifications')
export class NotificationsController {
  constructor(@Inject('INotificationProvider') private readonly notificationsProvider: INotificationProvider) {}

  @Post("/send")
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      return await this.notificationsProvider.sendNotification(createNotificationDto.message);
    } catch (error) {
      throw new HttpException('Failed to send notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}