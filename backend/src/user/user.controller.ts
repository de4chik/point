import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import type { Request } from "express";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("all")
    async getAllUsers() {
        return await this.userService.findAllUsers();
    }

    @Get("by-email/:email")
    async getUserByEmail(@Param("email") email: string) {
        const findUser = await this.userService.findUserByEmail(email);
        if (!findUser) {
            throw new NotFoundException("Пользователь с таким email не найден");
        }
        return findUser;
    }

    @Get("by-id/:id")
    async getUserById(@Param("id") id: string) {
        const findUser = await this.userService.findUserById(id);
        if (!findUser) {
            throw new NotFoundException("Пользователь с таким id не найден");
        }
        return findUser;
    }

    @Post("create")
    createUser(@Body() user: CreateUserDto) {
        return `create user with data: ${JSON.stringify(user)}`;
    }

    @Delete("delete")
    deleteUser(@Req() req: Request) {
        const token = req.headers.authorization;
        return token;
    }
}
