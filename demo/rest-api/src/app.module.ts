/*
 * @Descripttion: 
 * @version: 
 * @Author: guowh
 * @Date: 2022-05-11 22:39:01
 */
import {Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './modules/cat/cat.module';
import { UserModule } from './modules/user/user.module';
import { ErrorsInterceptor } from './modules/common/errors.interceptor';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserController } from './modules/user/user.controller';

/**
 * @Module() 定义一个模块，并管理这个模块的导入集合、控制器集合、提供者集合、导出集合
 */
@Module({
    // TypeOrmModule.forRoot() 默认加载项目根目录下的 ormconfig.json 配置文件用于配置数据库连接
    // TypeORM 配置文件详细文档 https://typeorm.io/#/using-ormconfig
    imports: [TypeOrmModule.forRoot(), CatModule, UserModule],  // 导入其他模块的集合
    controllers: [AppController],  // 当前模块的控制器集合
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorsInterceptor
        },
        AppService
    ],  // 当前模块的提供者集合
    exports: [], // 导出当前模块的提供者，用于被其他模块调用
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(UserController);
    }
}