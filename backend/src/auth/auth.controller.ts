import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/registe-user.dto";
import type { Request, Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        return registerUserDto;
    }

    // @Post('login')
    // login(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    //   return registerUserDto;
    // }

    // @Get('refresh')
    // refresh(
    //   @Body() registerUserDto: RegisterUserDto,
    //   @Res() res: Response,
    //   @Req() req: Request,
    // ) {
    //   return registerUserDto;
    // }
}
