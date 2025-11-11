import { Module } from "@nestjs/common";
import { JsonwebtokenService } from "./jsonwebtoken.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secretOrPrivateKey: process.env.JWT_SECRET,
            global: true,
        }),
    ],
    providers: [JsonwebtokenService],
    exports: [JsonwebtokenService],
})
export class JsonwebtokenModule {}
