import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { INotificationProvider } from "./INotificationProvider";
import * as qrcode from 'qrcode-terminal';
import { Client } from "whatsapp-web.js";

@Injectable()
export class WhatsappNotifications implements INotificationProvider {
    private client: Client;
    private readonly logger = new Logger(WhatsappNotifications.name);

    constructor() {

    }

    async initializeClient(): Promise<void> {

        this.logger.log('WhatsappNotifications constructor called');
        this.client = new Client({
            puppeteer: {
                headless: true,

            }
        });

        this.client.on('ready', () => {
            this.logger.log('WhatsApp client is ready!');
        });


        this.client.on("qr", (qr) => {
            this.logger.log('QR Code received');
            qrcode.generate(qr, { small: true });
        });




        this.client.on('message', async msg => {
            const chat = await msg.getChat();
            console.log(chat.id)
            if (msg.body == '!ping') {
                msg.reply('pong');
            }
        });

        await this.client.initialize();
    }

    async sendNotification(message: string): Promise<void> {
        this.client.sendMessage("573197208628@c.us", message);
    }
}