import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { TemplateService } from "./template.service";
import { CreateTemplateDto } from "./dto/create-template.dto";
import type { Request } from "express";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("template")
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @ApiBearerAuth()
    @Post("create")
    createTemplate(
        @Body() createTemplateDto: CreateTemplateDto,
        @Req() req: Request,
    ) {
        return this.templateService.createTemplate(createTemplateDto, req);
    }
}
