import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function createNestApp() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  // Extra configuration
  app.use(
    session({
      secret: 'lorem-ipsum-dolor-sit-amet',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());

  return app;
}

createNestApp().then(async (app) => {
  await app.listen(3000);
});

export const viteNodeApp = createNestApp();