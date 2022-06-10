import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class GetCodeDTO {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}

export class GetEmailCodeDTO {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly code: string;
}

export class LoginDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly nickname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class RegisterDTO {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly nickname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly code: string;
}