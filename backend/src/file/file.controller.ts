import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileService } from "./file.service";
import type { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
}
