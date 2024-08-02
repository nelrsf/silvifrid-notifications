import { Injectable, Logger } from "@nestjs/common";
import * as qrcode from 'qrcode';
import { Client } from "whatsapp-web.js";
import { INotificationProvider } from "./INotificationProvider";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class WhatsappNotifications implements INotificationProvider {
  private client: Client;
  private readonly logger = new Logger(WhatsappNotifications.name);
  private qrCodeImage: string | null = null;

  constructor(private readonly config: ConfigService){}

  async initializeClient(): Promise<void> {

    this.client = new Client({
      puppeteer: {
        headless: false
      }
    });

    this.client.on('ready', () => {
      this.logger.log('WhatsApp client is ready!');
    });

    this.client.on('message', async msg => {
      const chat = await msg.getChat();
      console.log(chat.id);
      if (msg.body == '!ping') {
        msg.reply('pong');
      }
    });

    this.client.on('qr', async (qr) => {
      this.logger.log("qr generado \n");
      this.logger.log(qr);

      // Generar la imagen del QR en base64
      this.qrCodeImage = await qrcode.toDataURL(qr);
    });

    await this.client.initialize();
  }

  sendNotification(message: string): void {
    const chatId = this.config.get<string>("TARGET_PHONE");
    this.client.sendMessage(chatId, message);
  }

  getQRCode(): string | null {
    return this.qrCodeImage; // Devuelve la imagen del QR en base64
  }
}
