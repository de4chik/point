import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JsonwebtokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaServce: PrismaService,
    ) {}

    generateTokens(id: string) {
        const accessToken = this.jwtService.sign({ id }, { expiresIn: "15m" });
        const refreshToken = this.jwtService.sign({ id }, { expiresIn: "30m" });
        return { accessToken, refreshToken };
    }

    async createOrUpdate(refreshToken: string, userId: string) {
        if (!refreshToken || !userId) {
            throw new BadRequestException();
        }
        const findToken = await this.prismaServce.token
            .findUnique({
                where: { userId },
            })
            .catch(() => {
                throw new BadRequestException("что-то пошло не так!");
            });
        if (findToken) {
            return await this.prismaServce.token
                .update({
                    where: { token: findToken.token },
                    data: { token: refreshToken, userId },
                })
                .catch(() => {
                    throw new ConflictException("Ошибка при добовлении");
                });
        }
        return await this.prismaServce.token
            .create({
                data: { token: refreshToken, userId },
            })
            .catch((err) => {
                console.log(err);

                throw new ConflictException("Ошибка при обновлении");
            });
    }

    verify(token: string) {
        return this.jwtService.verify(token);
    }

    async findToken(token: string) {
        return await this.prismaServce.token.findUnique({ where: { token } });
    }

    async delete(userId: string) {
        return await this.prismaServce.token
            .delete({ where: { userId } })
            .catch((err) => {
                console.log(err);
                throw new ConflictException("Что-то пошло не так!");
            });
    }
}
