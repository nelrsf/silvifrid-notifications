import { Injectable } from "@nestjs/common";
import { INotificationProvider } from "./INotificationProvider";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailNotifications implements INotificationProvider {

    private transporter: nodemailer.Transporter;

    constructor() {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_TRANSPORTER,
                pass: process.env.EMAIL_TRANSPORTER_PASSWORD
            },
        });
    }
    
    async sendNotification(message: string): Promise<void> {
        try {
            await this.transporter.sendMail({
              from: process.env.EMAIL_TRANSPORTER, 
              to: process.env.TARGET_EMAIL,
              subject: "VENTA SILVIFRID SHOP",
              text: message
            });
            console.log('Correo enviado exitosamente');
          } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw error;
          }
    }
}