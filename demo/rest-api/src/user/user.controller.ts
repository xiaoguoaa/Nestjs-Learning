import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';

import { Result } from '../common/result.interface';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
    constructor(
        @Inject(UserService) private readonly UserService: UserService,
    ) { }
}