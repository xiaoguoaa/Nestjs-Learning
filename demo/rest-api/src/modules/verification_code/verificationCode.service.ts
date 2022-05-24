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
import { User } from "../user/user.entity";

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    @InjectRepository(VerificationCode)
    private readonly CodeRepo: Repository<VerificationCode> // 使用泛型注入对应类型的存储库实例
  ) {}

  async getEmailCode(emailObj: { email: string; code: string }) {
    if (!emailObj.email || !emailObj.code) {
      throw new HttpException("这些参数必填: email、code", 500);
    }

    const findUser = this.UserRepo.findOne({ email: emailObj.email });
    if (findUser) {
      throw new HttpException("该邮箱已注册，请直接登录", 500);
    }

    const findCode = await this.CodeRepo.findOne({ email: emailObj.email });
    if (
      !emailObj.code ||
      !findCode ||
      findCode.code.toLocaleLowerCase() !== emailObj.code.toLocaleLowerCase()
    ) {
      throw new HttpException("邮箱或验证码错误", 500);
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

    let emailCode = randomCode(6);

    let mailOptions = {
      from: '"飞来就我题红" <973886860@qq.com>', // sender address
      to: emailObj.email, // list of receivers
      subject: "注册验证码", // Subject line
      html: `<b>注册验证码: <span style="color: #f66">${emailCode}</span></b>`, // html body
    };
    let result;
    await transporter
      .sendMail(mailOptions)
      .then(async () => {
        findCode.emailCode = emailCode;
        await this.CodeRepo.save(findCode);
      })
      .catch(() => {
        throw new HttpException("邮件发送失败", 500);
      });
    return result;
  }

  async getCode(email: string): Promise<string> {
    if (!email) {
      throw new HttpException("这些参数必填: email", 500);
    }

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
