import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const config = new DocumentBuilder()
    .setTitle("Пойнт")
    .setVersion("1.0")
    .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
    })
    .build();
export const documentFactory = (app: INestApplication<any>) =>
    SwaggerModule.createDocument(app, config);
