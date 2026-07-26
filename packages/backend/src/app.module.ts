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
            useFactory: (config: ConfigService) => {
                const dbConfig = config.getDatabaseConfig();
                const dialectOptions: Record<string, unknown> = {
                    connectionString: dbConfig.connectionString,
                };

                const sslMode = dbConfig.sslMode;
                if (sslMode && ["require", "verify-ca", "verify-full"].includes(sslMode)) {
                    dialectOptions.ssl = { require: true, rejectUnauthorized: sslMode === "verify-full" };
                }
                if (dbConfig.options) {
                    dialectOptions.options = dbConfig.options;
                }

                return {
                    dialect: "postgres" as const,
                    dialectOptions,
                    autoLoadModels: true,
                    synchronize: false,
                    logging: config.get("NODE_ENV") === "development" ? (sql: string) => console.log(sql) : false,
                };
            },
        }),
    ],
})
export class AppModule {}
