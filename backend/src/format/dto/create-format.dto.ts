import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateFormatDto {
    @ApiProperty({ default: "" })
    @IsString({ message: "Это строка!" })
    @MinLength(2, { message: "Минимум 2 символа!" })
    name: string;
}
