import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { JsonwebtokenModule } from "./jsonwebtoken/jsonwebtoken.module";
import { FormatModule } from "./format/format.module";
import { TemplateModule } from './template/template.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env.development",
        }),
        PrismaModule,
        UserModule,
        AuthModule,
        JsonwebtokenModule,
        FormatModule,
        TemplateModule,
    ],
})
export class AppModule {}
