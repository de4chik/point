import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { documentFactory } from "configs/swagger.config";
import cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(`api/v${process.env.VERSION}`);
    app.enableCors({ origin: process.env.CLIENT_URL });
    app.use(cookieParser());
    SwaggerModule.setup("swagger", app, documentFactory(app));

    await app.listen(process.env.PORT);
}
bootstrap();
