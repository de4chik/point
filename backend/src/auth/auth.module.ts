import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JsonwebtokenModule } from "src/jsonwebtoken/jsonwebtoken.module";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [UserModule, JsonwebtokenModule],
})
export class AuthModule {}
