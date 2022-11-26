import { UserService } from './user_service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.userService.save(body);
  }
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() body: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    return 'this.userService.findOne(body, response)';
  }

  @Get('user')
  async user(@Req() req: Request) {
    return this.userService.user(req);
  }
  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.refresh(req, res);
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.userService.logout(req, res);
    return { message: 'log out successfully' };
  }
}
