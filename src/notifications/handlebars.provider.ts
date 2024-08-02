import { Injectable, OnModuleInit } from '@nestjs/common';
import { join } from 'path';
import * as hbs from 'hbs';

@Injectable()
export class HandlebarsProvider implements OnModuleInit {
  onModuleInit() {
    this.registerPartials();
  }

  private registerPartials() {
    try {
      const partialsPath = join(__dirname, '..', '..', 'src', 'templates');
      hbs.registerPartials(partialsPath);
    } catch (error) {
      console.error('Error registering Handlebars partials:', error);
    }
  }
}