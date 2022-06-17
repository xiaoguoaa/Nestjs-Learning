/*
 * @Descripttion: 
 * @version: 
 * @Author: guowh
 * @Date: 2022-05-12 22:46:33
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UsePipes
} from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { GetCodeDTO, GetEmailCodeDTO, RegisterDTO, LoginDTO } from './user.dto';

import { Result } from "../common/result.interface";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { VerificationCodeService } from "../verification_code/VerificationCode.service";

@ApiTags("用户")
@Controller("User")
export class UserController {
  constructor(
    @Inject(UserService) private readonly UserService: UserService,
    @Inject(VerificationCodeService)
    private readonly VerificationCodeService: VerificationCodeService
  ) {}

  @Get("code")
  async getCode(@Query() query: GetCodeDTO): Promise<Result> {
    const data = await this.VerificationCodeService.getCode(query.email);
    return { code: 200, message: "获取验证码成功", data };
  }

  @Get("email_code")
  async getEmailCode(@Query() query: GetEmailCodeDTO): Promise<Result> {
    const data = await this.VerificationCodeService.getEmailCode(query);
    return { code: 200, message: "获取验证码成功", data };
  }

  @Post("register")
  async register(@Body() user: RegisterDTO): Promise<Result> {
    const data = await this.UserService.register(user);
    return { code: 200, message: "注册成功", data };
  }

  @Post("login")
  async login(@Body() user: LoginDTO): Promise<Result> {
    let data = await this.UserService.login(user);
    return { code: 200, message: "登录成功", data };
  }
}
