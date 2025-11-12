import { BadRequestException, Injectable } from "@nestjs/common";
import type { Express } from "express";
import { resolve } from "path";

@Injectable()
export class FileService {
    upload(files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException("Файлы не переданы");
        }

        return files.map(
            (file) => `${process.env.SERVER_STATIC_URL}/${file.filename}`,
        );
    }
}
