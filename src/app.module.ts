import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './Auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ItemsModule } from './Item/items.module';
import { InvoiceModule } from './Invoices/invoice.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Change if using a remote DB
      port: 3306, // Default MySQL port
      username: 'root', // Your phpMyAdmin username
      password: '', // Your MySQL password
      database: 'tashteep', // Name of your database
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production!
    }),   
    AuthModule,
    ProjectsModule,
    ItemsModule,
    InvoiceModule,
    MulterModule.register({
      dest: './uploads', // This is where images will be stored
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
