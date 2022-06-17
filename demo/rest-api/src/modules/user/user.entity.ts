import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity("user")
export class User {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: "自增ID",
  })
  id: number;

  @Column({
    comment: "昵称",
  })
  nickname: string;

  @Column({
    comment: "邮箱",
  })
  email: string;

  @Column({
    comment: "密码",
    select: false
  })
  password: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date;

  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
