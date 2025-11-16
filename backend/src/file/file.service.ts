import { BadRequestException, Injectable } from "@nestjs/common";

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
