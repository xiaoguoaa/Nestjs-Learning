import { IsNotEmpty, IsString, IsEmail } from 'class-validator';


export class GetCodeDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}

export class GetEmailCodeDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly code: string;
}

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    readonly nickname: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class RegisterDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly nickname: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    @IsString()
    @IsNotEmpty()
    readonly code: string;
}