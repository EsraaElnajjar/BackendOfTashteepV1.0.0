import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // السماح بالوصول إلى مجلد 'uploads' عبر HTTP
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // يجعل الصور متاحة عبر 'http://localhost:3000/uploads'
  });

  app.enableCors(); // السماح للفرونت إند بالوصول

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
