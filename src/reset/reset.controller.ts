import { BadRequestException } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller('auth')
export class ResetController {
    constructor(private resetService:ResetService){}


    @Post('forgot')
    async forgot(@Body('email') email:string){
        const token = Math.random().toString(20).substring(2,12);
        try {
             await this.resetService.saveToken({email,token})
             await this.resetService.sendmail({email,token})
        } catch (error) {
            throw new BadRequestException("provide an email please")
        }
        
    }

    @Post('reset')
    async  reset(@Body() body:any){
       return this.resetService.reset(body);
    }
}
