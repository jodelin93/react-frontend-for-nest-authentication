import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { TokenEntity } from './token_entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity) private tokenRepo: Repository<TokenEntity>,
  ) {}

  async saveToken(data: any) {
    this.tokenRepo.save(data);
  }

  async deleteToken(token: any) {
    await this.tokenRepo.delete({ token });
  }

  async findOneTOken(user_id) {
    return await this.tokenRepo.findOneBy({
      user_id,
      expire_date: MoreThanOrEqual(new Date()),
    });
  }
}
