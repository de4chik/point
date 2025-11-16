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
import { FileService } from "src/file/file.service";

@Injectable()
export class TemplateService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly formatService: FormatService,
        private readonly fileService: FileService,
    ) {}
    async createTemplate(
        createTemplateDto: CreateTemplateDto,
        req: Request,
        files: Express.Multer.File[],
    ) {
        console.log(createTemplateDto);

        const filesUrl = this.fileService.upload(files);

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
                    files: filesUrl,
                },
            })
            .catch((err: PrismaClientValidationError) => {
                console.log(err.name);
                throw new ConflictException("Что-то пошло не так!");
            });
    }
}
