import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
          secret: 'hgfjtjyt67fghg', // لازم تكتبي نفس السر في .env او هنا
          signOptions: { expiresIn: '60m' },
        })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
