import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { TemplateService } from "./template.service";
import { CreateTemplateDto } from "./dto/create-template.dto";
import type { Request } from "express";
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller("template")
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @UseGuards(AuthGuard("jwt"))
    @ApiBearerAuth()
    @Post("create")
    @ApiConsumes("multipart/form-data")
    createTemplate(
        @Body() createTemplateDto: CreateTemplateDto,
        @Req() req: Request,
    ) {
        return this.templateService.createTemplate(createTemplateDto, req);
    }

    @Get("all")
    getAllTemplate() {
        return this.templateService.findAll();
    }
}
