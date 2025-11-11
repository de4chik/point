import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: "Некорректный email" })
    @ApiProperty({ default: "email@mail.com" })
    email: string;

    @MinLength(8, { message: "Пароль должен быть минимум 8 символов" })
    @IsString({ message: "Пароль должен быть строкой" })
    @ApiProperty({ default: "12345678" })
    password: string;
}
