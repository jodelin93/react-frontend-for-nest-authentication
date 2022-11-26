import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;
  @Column()
  token: string;
  @CreateDateColumn()
  created_at: Date;
  @Column()
  expire_date: Date;
}
