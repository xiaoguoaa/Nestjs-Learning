import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        console.log('user controller 中间件触发');
        next();
    }
}