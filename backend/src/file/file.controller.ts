import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { basename, extname, join } from "path";
import uuid from "uuid";

@Controller("files")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("upload")
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
            },
        },
    })
    uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        return this.fileService.upload(files);
    }
}
