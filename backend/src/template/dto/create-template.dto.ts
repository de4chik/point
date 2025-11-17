import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsJSON, IsString, MinLength } from "class-validator";

export class CreateTemplateDto {
    @ApiProperty()
    @IsString({ message: "Это строка!" })
    @MinLength(2, { message: "Минимум 2 символа" })
    name: string;

    @ApiProperty({ type: String })
    @IsJSON({ each: true, message: "Каждый элемент должен быть JSON" })
    files: string;

    @IsString({ message: "Требуется формат!" })
    @ApiProperty()
    formatName: string;
}
