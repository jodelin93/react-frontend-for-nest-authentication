import { BadRequestException, HttpCode, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user_entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { TokenService } from './token_service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async save(body: any) {
    if (body.password !== body.confirm_password) {
      throw new BadRequestException('Password do not match');
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(body.password, salt);

    return await this.userRepo.save({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: hash,
    });
  }

  async findOneByEmail(email:any){
    return await this.userRepo.findOneBy({email})
  }
  async updateUser(id:number,password:any){
    return await this.userRepo.update({id},{password})
  }

  async findOne(body: any, res: Response) {
    const user = await this.userRepo.findOneBy({ email: body.email });

    if (!user) {
      throw new BadRequestException('Bad Credentials');
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Bad Credentials');
    }

    const access_token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '30s' },
    );
    const refreshToken = await this.jwtService.signAsync({ id: user.id });

    let expire_date = new Date();
    expire_date.setDate(expire_date.getDate() + 7);

    await this.tokenService.saveToken({
      user_id: user.id,
      token: refreshToken,
      expire_date,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      token: `Bearer ${access_token}`,
    };
  }

  async user(req: Request) {
    const access_token = req.headers.authorization.replace('Bearer','');
    try {
      const { id } = this.jwtService.verify(access_token);
      const { password, ...data } = await this.userRepo.findOneBy({ id });
      return data;
    } catch (error) {
      throw new BadRequestException('Not authorized');
    }
  }

  async refresh(req: Request, res: Response) {
    const refresh_token = req.cookies['refresh_token'];
    try {
      const { id } = await this.jwtService.verify(refresh_token);
      const tokenEntity = await this.tokenService.findOneTOken({ user_id: id });

      if (!tokenEntity) {
        throw new BadRequestException('Not authorized Request');
      }
      const access_token = await this.jwtService.signAsync(
        { id },
        { expiresIn: '30s' },
      );
      return `Bearer ${access_token}`;
    } catch (error) {
      throw new BadRequestException('Not authorized Request');
    }
  }

  async logout(req: Request, res: Response) {
    const refresh_token = req.cookies['refresh_token'];
    this.tokenService.deleteToken(refresh_token);
    res.clearCookie('refresh_token');
  }
}
