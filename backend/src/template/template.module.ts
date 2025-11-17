import { Module } from "@nestjs/common";
import { TemplateService } from "./template.service";
import { TemplateController } from "./template.controller";
import { FormatModule } from "src/format/format.module";
import { UserModule } from "src/user/user.module";

@Module({
    controllers: [TemplateController],
    providers: [TemplateService],
    imports: [FormatModule, UserModule],
})
export class TemplateModule {}
