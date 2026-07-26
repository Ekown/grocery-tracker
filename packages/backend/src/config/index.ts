import { Global, Injectable, Module } from "@nestjs/common";
import dotenv from "dotenv";
import path from "path";

/** Loads .env from the monorepo root */
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

/** Connection details extracted from DATABASE_URL */
export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    connectionString: string;
    options?: string;
    sslMode?: string;
}

/** Simple config accessor wrapping process.env */
@Injectable()
export class ConfigService {
    get(key: string, fallback?: string): string {
        return process.env[key] ?? fallback ?? "";
    }

    getNumber(key: string, fallback?: number): number {
        const val = process.env[key];
        if (val === undefined || val === null || val === "") {
            return fallback ?? 0;
        }
        const parsed = Number(val);
        if (Number.isNaN(parsed)) {
            throw new Error(`Environment variable "${key}" has value "${val}" which is not a valid number.`);
        }
        return parsed;
    }

    /** Returns the raw DATABASE_URL and parsed options */
    getDatabaseConfig(): DatabaseConfig {
        const raw = process.env.DATABASE_URL;
        if (!raw) {
            throw new Error("DATABASE_URL is not set. Check your .env file or environment variables.");
        }
        const url = new URL(raw);
        return {
            host: url.hostname,
            port: Number(url.port) || 5432,
            username: url.username,
            password: url.password,
            database: url.pathname.replace(/^\//, ""),
            connectionString: raw,
            options: url.searchParams.get("options") || undefined,
            sslMode: url.searchParams.get("sslmode") || undefined,
        };
    }
}

@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
