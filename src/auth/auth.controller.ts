import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  signup(@Body() createdAdminDto: CreateAdminDto) {
    return this.authService.signup(createdAdminDto);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signin(@Body() signinAdminDto: SigninAdminDto) {
    return this.authService.signin(signinAdminDto);
  }
}
