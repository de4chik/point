import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { documentFactory } from "configs/swagger.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(`api/v${process.env.VERSION}`);

    SwaggerModule.setup("swagger", app, documentFactory(app));

    await app.listen(process.env.PORT);
}
bootstrap();
