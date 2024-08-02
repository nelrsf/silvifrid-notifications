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

  @Get("/initializewp")
  async initialize() {
    try {
      if (this.notificationsProvider instanceof WhatsappNotifications) {
        await this.notificationsProvider.initializeClient();
        return { message: "WhatsApp client initialized successfully" };
      } else {
        throw new HttpException('Provider is not WhatsappNotifications', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Failed to initialize WhatsApp client' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('qr')
  @Render('qr')
  getQRCode() {
    if (this.notificationsProvider instanceof WhatsappNotifications) {
      const qr = this.notificationsProvider.getQRCode();
      return qr ? { qr } : { message: 'QR code not generated yet.' };
    } else {
      return { message: 'WhatsApp provider not available.' };
    }
  }
}