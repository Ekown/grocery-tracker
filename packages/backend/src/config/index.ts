import { Global, Injectable, Module } from "@nestjs/common";
import dotenv from "dotenv";
import path from "path";

/** Loads .env from the monorepo root */
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

/** Parsed connection details extracted from DATABASE_URL */
export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
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

    /** Parses DATABASE_URL into connection components */
    getDatabaseConfig(): DatabaseConfig {
        const raw = process.env.DATABASE_URL;
        if (!raw) {
            throw new Error("DATABASE_URL is not set. Check your .env file or environment variables.");
        }
        const url = new URL(raw);
        return {
            host: url.hostname,
            port: Number(url.port) || 5432,
            username: decodeURIComponent(url.username),
            password: decodeURIComponent(url.password),
            database: url.pathname.replace(/^\//, ""),
        };
    }
}

@Global()
@Module({
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
