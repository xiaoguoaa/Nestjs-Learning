import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";

import { User } from "./user.entity";
import { VerificationCode } from "src/verification_code/verificationCode.entity";

export class UserAndCode extends User {
  code?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User> // 使用泛型注入对应类型的存储库实例
  ) {}

  async register(user: UserAndCode): Promise<User> {
    const findCode = await getConnection()
      .createQueryBuilder()
      .select("code")
      .from(VerificationCode, "vc")
      .where("vc.email = :email", { email: user.email })
      .getOne();
    console.log("user", user);
    console.log("findCode", findCode);
    if (
      !user.code ||
      !findCode ||
      findCode.code.toLocaleLowerCase() !== user.code.toLocaleLowerCase()
    ) {
      throw new HttpException("验证码错误", 500);
    }

    delete user.id;
    delete user.code;

    let findUser = await this.UserRepo.findOne({ nickname: user.nickname });
    if (findUser) {
      throw new HttpException("该昵称已注册，请直接登录", 500);
    }
    findUser = await this.UserRepo.findOne({ email: user.email });
    if (findUser) {
      throw new HttpException("该邮箱已注册，请直接登录", 500);
    }

    return this.UserRepo.save(this.UserRepo.create(user));
  }
}
