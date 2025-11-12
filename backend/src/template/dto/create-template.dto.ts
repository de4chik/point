import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsUUID, MinLength } from "class-validator";

export class CreateTemplateDto {
    @ApiProperty()
    @IsString({ message: "Это строка!" })
    @MinLength(2, { message: "Минимум 2 символа" })
    name: string;

    @ApiProperty({ type: [String] })
    @IsString({ each: true, message: "Каждый элемент должен быть строкой" })
    @IsArray({ message: "Должен быть массивом" })
    files: string[];

    @IsUUID("all", { message: "Требуется формат!" })
    @ApiProperty()
    formatId: string;
}
