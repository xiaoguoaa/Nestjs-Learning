import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { VerificationCodeService } from 'src/verification_code/VerificationCode.service';
import { VerificationCode } from 'src/verification_code/verificationCode.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([VerificationCode])],
    controllers: [UserController],
    providers: [UserService, VerificationCodeService],
})
export class UserModule { }