import {
    Body,
    Controller,
    Post,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { TemplateService } from "./template.service";
import { CreateTemplateDto } from "./dto/create-template.dto";
import type { Request } from "express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { basename, extname, join } from "path";
import uuid from "uuid";

@UseGuards(AuthGuard("jwt"))
@Controller("template")
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @UseInterceptors(
        FilesInterceptor("files", 10, {
            storage: diskStorage({
                destination: join(process.cwd(), "uploads"),
                filename: (req, file, cb) => {
                    const originalName = file.originalname;
                    const ext = extname(originalName);
                    const nameWithoutExt = basename(originalName, ext);

                    const uniqueName = nameWithoutExt + "-" + uuid.v4();
                    cb(null, `${uniqueName}${ext}`);
                },
            }),
        }),
    )
    @ApiBearerAuth()
    @Post("create")
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary",
                    },
                },
                name: { type: "string", default: "name" },
                formatName: {
                    type: "string",
                    default: "1b5a98c2-bfc2-4859-93ba-259a7d730d8b",
                },
            },
        },
    })
    createTemplate(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() createTemplateDto: CreateTemplateDto,
        @Req() req: Request,
    ) {
        return this.templateService.createTemplate(
            createTemplateDto,
            req,
            files,
        );
    }
}
