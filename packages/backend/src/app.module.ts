import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "./config";
import { HealthModule } from "./health/health.module";

@Module({
    imports: [
        ConfigModule,
        HealthModule,
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                dialect: "postgres" as const,
                ...config.getDatabaseConfig(),
                autoLoadModels: true,
                synchronize: false, // Use migrations only
                logging: config.get("NODE_ENV") === "development" ? (sql: string) => console.log(sql) : false,
            }),
        }),
    ],
})
export class AppModule {}
