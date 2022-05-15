import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  })
  password: string;
}
