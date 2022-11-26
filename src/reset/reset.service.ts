import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reset } from './reset';
import {MailerService} from '@nestjs-modules/mailer'
import { UserService } from 'src/user/user_service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ResetService {
    constructor(@InjectRepository(Reset) private readonly resetRepo:Repository<Reset>,
    private mailerService:MailerService,private userService:UserService){

        }

        async saveToken(token){
            return await this.resetRepo.save(token)
        }

        async sendmail({email,token}){
            await this.mailerService.sendMail({to:email,subject:"reset password",html:`
            click <a href="http://localhost:3000/reset/${token}">here</a> to reset your password `})
        }

        async reset({token,password,}){
            const reset=  await this.resetRepo.findOneBy({token})
            if(!reset){
                throw new BadRequestException("bad request")
            }
            const {email}=reset;
            const user = await this.userService.findOneByEmail(email)

            if(!user){
                throw new BadRequestException("bad request")
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
        
            await this.userService.updateUser(user.id,hash)
            

        }
}
