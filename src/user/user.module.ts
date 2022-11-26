import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user_entity';
import { UserService } from './user_service';
import {JwtModule} from '@nestjs/jwt'
import { TokenService } from './token_service';
import { TokenEntity } from './token_entity';

@Module({imports:[TypeOrmModule.forFeature([User,TokenEntity]),JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1w' },
  })],controllers:[UserController],providers:[UserService,TokenService],exports:[UserService]})
export class UserModule {}
