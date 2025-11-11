import { ConflictException, Injectable } from "@nestjs/common";
import { CreateFormatDto } from "./dto/create-format.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "generated/prisma/internal/prismaNamespace";
import { UpdateFormatDto } from "./dto/update-format.dto";

@Injectable()
export class FormatService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(createFormatDto: CreateFormatDto) {
        await this.prismaService.format
            .create({ data: createFormatDto })
            .catch((err: PrismaClientKnownRequestError) => {
                if (err.code === "P2002") {
                    throw new ConflictException("Такой формат уже существует!");
                }
                throw new ConflictException("Что-то пошло не так!");
            });
    }

    async findAll() {
        return await this.prismaService.format.findMany().catch(() => {
            throw new ConflictException("Что-то пошло не так!");
        });
    }

    async findByName(name: string) {
        return await this.prismaService.format
            .findUnique({ where: { name } })
            .catch((err) => {
                throw new ConflictException("Что-то пошло не так!");
            });
    }

    async update(id: string, updateFormatDto: UpdateFormatDto) {
        return await this.prismaService.format
            .update({ where: { id }, data: updateFormatDto })
            .catch((err) => {
                throw new ConflictException("Что-то пошло не так!");
            });
    }

    async remove(id: string) {
        return await this.prismaService.format
            .delete({ where: { id } })
            .catch((err) => {
                throw new ConflictException("Что-то пошло не так!");
            });
    }
}
