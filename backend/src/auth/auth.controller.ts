import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/registe-user.dto";
import type { Request, Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        return this.authService.register(registerUserDto, res);
    }

    @Post("login")
    login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        return this.authService.login(loginUserDto, res);
    }

    @Get("refresh")
    refresh(@Req() req: Request, @Res() res: Response) {
        return this.authService.refresh(req, res);
    }

    @Get("logout")
    logout(@Req() req: Request, @Res() res: Response) {
        return this.authService.logout(req, res);
    }
}
