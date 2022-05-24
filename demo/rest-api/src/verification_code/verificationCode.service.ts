/*
 * @Descripttion: 
 * @version: 
 * @Author: guowh
 * @Date: 2022-05-24 09:41:01
 */
import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as svgCaptcha from "svg-captcha";
import * as nodemailer from "nodemailer";

import { randomCode } from "src/utils";
import { VerificationCode } from "./verificationCode.entity";

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly CodeRepo: Repository<VerificationCode> // 使用泛型注入对应类型的存储库实例
  ) {}

  async getEmailCode(emailObj: { email: string, code: string }) {
    const findCode = await this.CodeRepo.findOne({ email: emailObj.email });
    if (
      !emailObj.code ||
      !findCode ||
      findCode.code.toLocaleLowerCase() !== emailObj.code.toLocaleLowerCase()
    ) {
      throw new HttpException("验证码错误", 200);
    }

    let transporter = nodemailer.createTransport({
      // host: 'smtp.ethereal.email',
      service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
      port: 465, // SMTP 端口
      secureConnection: true, // 使用了 SSL
      auth: {
        user: "973886860@qq.com",
        // smtp授权码
        pass: "khuwnzosskcdbfbh",
      },
    });

    let mailOptions = {
      from: '"sendUserName" <973886860@qq.com>', // sender address
      to: emailObj.email, // list of receivers
      subject: "注册验证码", // Subject line
      html: `<b>${randomCode(6)}</b>`, // html body
    };

    let result;
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        result = new HttpException("邮件发送错误", 500);
      }
      result = true;
    });
    return result;
  }

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
