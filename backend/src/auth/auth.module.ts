import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JsonwebtokenModule } from "src/jsonwebtoken/jsonwebtoken.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UserModule, JsonwebtokenModule],
})
export class AuthModule {}
