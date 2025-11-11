import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAllUsers(): Promise<User[]> {
        return await this.prismaService.user.findMany().catch(() => {
            throw new BadRequestException("Не удалось получить пользователей");
        });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        if (!email) {
            throw new BadRequestException("Нет email");
        }
        return await this.prismaService.user
            .findUnique({ where: { email } })
            .catch(() => {
                throw new BadRequestException(
                    "Не удалось получить пользователя по email",
                );
            });
    }

    async findUserById(id: string): Promise<User | null> {
        if (!id) {
            throw new BadRequestException("Нет id");
        }
        return await this.prismaService.user
            .findUnique({ where: { id } })
            .catch(() => {
                throw new BadRequestException(
                    "Не удалось получить пользователя по id",
                );
            });
    }

    async deleteUserById(id: string): Promise<User> {
        return await this.prismaService.user
            .delete({ where: { id } })
            .catch(() => {
                throw new BadRequestException(
                    "Не удалось удалить пользователя",
                );
            });
    }
}
