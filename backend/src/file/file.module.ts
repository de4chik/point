import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule {}
