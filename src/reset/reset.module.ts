import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';
import { Reset } from './reset';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user_service';
import { UserModule } from 'src/user/user.module';
@Module({
  imports:[UserModule,TypeOrmModule.forFeature([Reset]),MailerModule.forRoot({transport:{
    host:' 0.0.0.0',
    port:1025
  },defaults:{
    from:"jodelin@gmail.com"
  }})],
  controllers: [ResetController],
  providers: [ResetService]
})
export class ResetModule {}
