/*
 * @Descripttion:
 * @version:
 * @Author: guowh
 * @Date: 2022-05-24 09:41:01
 */
import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./user.entity";
import { VerificationCode } from "src/verification_code/verificationCode.entity";

export class UserAndCode extends User {
  code?: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>, // 使用泛型注入对应类型的存储库实例
    @InjectRepository(VerificationCode)
    private readonly CodeRepo: Repository<VerificationCode> // 使用泛型注入对应类型的存储库实例
  ) {}

  async register(user: UserAndCode): Promise<boolean> {
    const findCode = await this.CodeRepo.findOne({ email: user.email });
    if (
      !user.code ||
      !findCode ||
      findCode.emailCode.toLocaleLowerCase() !== user.code.toLocaleLowerCase()
    ) {
      throw new HttpException("注册验证码错误", 200);
    }

    delete user.id;
    delete user.code;

    let findUser = await this.UserRepo.findOne({ nickname: user.nickname });
    if (findUser) {
      throw new HttpException("该昵称已注册，请直接登录", 200);
    }

    await this.UserRepo.save(this.UserRepo.create(user));
    await this.CodeRepo.delete(findCode.id);

    return true;
  }

  async login(user: User) {
    let findUser = this.UserRepo.find({
      nickname: user.nickname,
      password: user.password,
    });
    if (!findUser) {
      findUser = this.UserRepo.find({
        email: user.email,
        password: user.password,
      });
    }
    if (!findUser) {
      throw new HttpException("账号或密码错误，请重新登录", 200);
    }
  }
}
