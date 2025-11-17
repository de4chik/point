import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { FormatService } from "src/format/format.service";
import type { Request } from "express";
import { PrismaClientValidationError } from "generated/prisma/internal/prismaNamespace";

@Injectable()
export class TemplateService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly formatService: FormatService,
    ) {}
    async createTemplate(createTemplateDto: CreateTemplateDto, req: Request) {
        console.log(createTemplateDto);

        const findFormat = await this.formatService.findByName(
            createTemplateDto.formatName,
        );
        if (!findFormat) {
            throw new NotFoundException("Нужен существующий формат!");
        }
        return await this.prismaService.template
            .create({
                data: {
                    ...createTemplateDto,
                    userId: req.user.id,
                },
            })
            .catch((err: PrismaClientValidationError) => {
                console.log(err.name);
                throw new ConflictException("Что-то пошло не так!");
            });
    }

    async findAll() {
        return this.prismaService.template.findMany();
    }
}
