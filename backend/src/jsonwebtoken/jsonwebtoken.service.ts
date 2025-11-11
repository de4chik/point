import {
    BadRequestException,
    ConflictException,
    Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JsonwebtokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaServce: PrismaService,
    ) {}

    generateTokens(id: string) {
        const accessToken = this.jwtService.signAsync(
            { id },
            { expiresIn: "15m" },
        );
        const refreshToken = this.jwtService.signAsync(
            { id },
            { expiresIn: "30m" },
        );
        return { accessToken, refreshToken };
    }

    async createOrUpdate(refreshToken: string, userId: string) {
        if (!refreshToken || !userId) {
            throw new BadRequestException();
        }
        const findToken = await this.prismaServce.token.findUnique({
            where: { userId },
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
            .catch(() => {
                throw new ConflictException("Ошибка при добовлении");
            });
    }
}
