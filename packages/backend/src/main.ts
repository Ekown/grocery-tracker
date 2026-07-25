import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix("api");
    app.enableCors({
        origin: config.get("CORS_ORIGIN", "http://localhost:5173").split(","),
        credentials: true,
    });

    const port = config.getNumber("PORT", 3000);
    await app.listen(port);
    console.log(`Backend listening on port ${port}`);
}

bootstrap();
