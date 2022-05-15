import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as svgCaptcha from "svg-captcha";

import { VerificationCode } from "./verificationCode.entity";

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly CodeRepo: Repository<VerificationCode> // 使用泛型注入对应类型的存储库实例
  ) {}

  async getCode(email: string): Promise<string> {
    var captcha = svgCaptcha.create({
      size: 4,
      background: "#5588aa",
    });

    let findCode = await this.CodeRepo.findOne({ email });
    if (findCode) {
      // 更新
      findCode.code = captcha.text;
    } else {
      // 新增
      findCode = this.CodeRepo.create({
        code: captcha.text,
        email,
      });
    }
    await this.CodeRepo.save(findCode);

    return captcha.data;
  }
}
