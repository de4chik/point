import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { FormatService } from "src/format/format.service";
import { UserService } from "src/user/user.service";
import type { Request } from "express";
import { PrismaClientValidationError } from "generated/prisma/internal/prismaNamespace";

@Injectable()
export class TemplateService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly formatService: FormatService,
        private readonly userService: UserService,
    ) {}
    async createTemplate(createTemplateDto: CreateTemplateDto, req: Request) {
        const findFormat = await this.formatService.findById(
            createTemplateDto.formatId,
        );
        if (!findFormat) {
            throw new NotFoundException("Нужен существующий формат!");
        }

        return await this.prismaService.template
            .create({
                data: { ...createTemplateDto, userId: req.user.id },
            })
            .catch((err: PrismaClientValidationError) => {
                console.log(err.name);
                throw new ConflictException("Что-то пошло не так!");
            });
    }
}
