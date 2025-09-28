import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME }
    }),
    AdminModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
