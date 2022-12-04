// 用户表
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, unique: true })
  username: string;

  @Column('varchar', { nullable: false })
  password: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  modifyTime: Date;
}
