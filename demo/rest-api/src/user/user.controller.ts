import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { Result } from "../common/result.interface";
import { UserService, UserAndCode } from "./user.service";
import { VerificationCodeService } from "../verification_code/VerificationCode.service";
@Controller("User")
export class UserController {
  constructor(
    @Inject(UserService) private readonly UserService: UserService,
    @Inject(VerificationCodeService)
    private readonly VerificationCodeService: VerificationCodeService
  ) {}

  @Get("code/:email")
  async getCode(@Param("email") email: string): Promise<Result> {
    const data = await this.VerificationCodeService.getCode(email);
    return { code: 200, message: "获取验证码成功", data };
  }

  @Post("register")
  async register(@Body() user: UserAndCode): Promise<Result> {
    await this.UserService.register(user);
    return { code: 200, message: "注册成功" };
  }
}
