import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import type { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Get("all")
    @UseGuards(AuthGuard("jwt"))
    async getAllUsers() {
        return await this.userService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Get("by-email/:email")
    async getUserByEmail(@Param("email") email: string) {
        const findUser = await this.userService.findByEmail(email);
        if (!findUser) {
            throw new NotFoundException("Пользователь с таким email не найден");
        }
        return findUser;
    }

    @Get("by-id/:id")
    async getUserById(@Param("id") id: string) {
        const findUser = await this.userService.findById(id);
        if (!findUser) {
            throw new NotFoundException("Пользователь с таким id не найден");
        }
        return findUser;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Get("profile")
    getUserProfile(@Req() req: Request) {
        const { id } = req.user as { id: string };

        return this.userService.findById(id);
    }

    @Post("create")
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Delete("delete")
    deleteUser(@Req() req: Request) {
        const token = req.headers.authorization;
        return token;
    }
}
