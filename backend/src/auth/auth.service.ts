import {
    ConflictException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { RegisterUserDto } from "./dto/registe-user.dto";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserService } from "src/user/user.service";
import { JsonwebtokenService } from "src/jsonwebtoken/jsonwebtoken.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JsonwebtokenService,
    ) {}

    async register(registerUserDto: RegisterUserDto, res: Response) {
        const findUser = await this.userService.findByEmail(
            registerUserDto.email,
        );
        if (findUser) {
            throw new ConflictException(
                "Пользователь с таким email уже зарегестрирован",
            );
        }
        const hashedPassword = this.hashPassword(registerUserDto.password);
        const newUser = await this.userService
            .create({
                ...registerUserDto,
                password: hashedPassword,
            })
            .catch(() => {
                throw new ConflictException("Не удалось зарегестрироваться");
            });

        const tokens = this.jwtService.generateTokens(newUser.id);
        await this.jwtService.createOrUpdate(tokens.refreshToken, newUser.id);

        const { password, ...sendUser } = newUser;

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res
            .status(HttpStatus.CREATED)
            .json({ user: sendUser, accessToken: tokens.accessToken });
    }

    async login(loginUserDto: LoginUserDto, res: Response) {
        const findUser = await this.userService
            .findByEmail(loginUserDto.email)
            .catch(() => {
                throw new ConflictException("что-то пошло не так!");
            });
        if (!findUser) {
            throw new ConflictException("Не верный логин или пароль");
        }
        const verifiedPassword = this.verifyPassword(
            loginUserDto.password,
            findUser.password,
        );
        if (!verifiedPassword) {
            throw new ConflictException("Не верный логин или пароль");
        }
        const tokens = this.jwtService.generateTokens(findUser.id);
        await this.jwtService.createOrUpdate(tokens.refreshToken, findUser.id);

        const { password, ...sendUser } = findUser;

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res
            .status(HttpStatus.OK)
            .json({ user: sendUser, accessToken: tokens.accessToken });
    }

    async refresh(req: Request, res: Response) {
        const { refreshToken } = req.cookies as { refreshToken: string };
        if (!refreshToken) {
            throw new UnauthorizedException("Пользоваиель не авторизован");
        }
        const { id } = this.jwtService.verify(refreshToken) as { id: string };
        const findUser = await this.userService.findById(id);
        if (!findUser) {
            throw new UnauthorizedException("Пользоваиель не авторизован");
        }
        const tokens = this.jwtService.generateTokens(id);
        await this.jwtService.createOrUpdate(tokens.refreshToken, id);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res
            .status(HttpStatus.OK)
            .json({ accessToken: tokens.accessToken });
    }

    async logout(req: Request, res: Response) {
        const { refreshToken } = req.cookies as { refreshToken: string };

        if (!refreshToken) {
            throw new UnauthorizedException("Пользоваиель не авторизован");
        }
        const findToken = await this.jwtService.findToken(refreshToken);
        if (!findToken) {
            throw new UnauthorizedException("Пользоваиель не авторизован");
        }
        const { id } = this.jwtService.verify(refreshToken) as { id: string };
        const findUser = await this.userService.findById(id);
        if (!findUser) {
            throw new UnauthorizedException("Пользоваиель не авторизован");
        }
        await this.jwtService.delete(id);

        return res
            .clearCookie("refreshToken")
            .status(HttpStatus.OK)
            .json("Вы вышли!");
    }

    // HASHPASSWORD
    hashPassword(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    verifyPassword(password: string, hashedPassword: string) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}
