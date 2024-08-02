import { Injectable } from "@nestjs/common";
import { INotificationProvider } from "./INotificationProvider";
import { ConfigService } from "@nestjs/config";
import { Twilio } from 'twilio';


@Injectable()
export class WhatsappNotifications implements INotificationProvider {

  private client: Twilio;

  constructor(private readonly config: ConfigService){
    this.client = new Twilio(
      this.config.get<string>('TWILIO_ACCOUNT_SID'),
      this.config.get<string>('TWILIO_AUTH_TOKEN'),
    )
  }

  async sendNotification(message: string): Promise<void> {
    const targetPhone = this.config.get<string>("TARGET_PHONE");
    await this.client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${targetPhone}`,
      body: message,
    });

  }

}
