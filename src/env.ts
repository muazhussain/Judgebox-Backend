import { config } from 'dotenv';
import { z } from 'zod';
import * as path from 'path';

interface EnvironmentConfig {
    port: number;
    env: string;
    timezone: string;
    app: {
        name: string;
        api: {
            prefix: string;
            title: string;
            description: string;
            version: string;
        };
    };
    security: {
        bcryptSaltRounds: number;
        jwtSecret: string;
    };
    swagger: {
        user: string;
        password: string;
    };
    database: {
        url: string;
        synchronize: boolean;
        logging: boolean;
        autoLoadEntities: boolean;
        entities: string;
        migrations: string;
        migrationsDir: string;
    };
    mongodb: {
        uri: string;
    };
    redis: {
        url: string;
    };
}

const envSchema = z.object({
    PORT: z.string().transform(Number),
    NODE_ENV: z.string().default('dev'),
    TZ: z.string(),

    APP_NAME: z.string(),
    API_PREFIX: z.string(),
    API_TITLE: z.string(),
    API_DESC: z.string(),
    API_VERSION: z.string(),

    BCRYPT_SALT_ROUNDS: z.string().transform(Number),
    JWT_SECRET: z.string().min(5),

    SWAGGER_USER: z.string(),
    SWAGGER_PASSWORD: z.string(),

    // Database URLs
    DATABASE_URL: z.string(),
    MONGODB_URL: z.string(),
    REDIS_URL: z.string(),

    // Additional PostgreSQL settings
    TYPEORM_SYNCHRONIZE: z.string().transform((val) => val === 'true'),
    TYPEORM_LOGGING: z.string().transform((val) => val === 'true'),
    TYPEORM_AUTOLOAD_ENTITIES: z.string().transform((val) => val === 'true'),
    TYPEORM_ENTITIES: z.string(),
    TYPEORM_MIGRATIONS: z.string(),
    TYPEORM_MIGRATIONS_DIR: z.string(),
});

config({
    path: path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'dev'}`),
});

const validatedEnv = envSchema.parse(process.env);

export const ENV: EnvironmentConfig = {
    port: validatedEnv.PORT,
    env: validatedEnv.NODE_ENV,
    timezone: validatedEnv.TZ,
    app: {
        name: validatedEnv.APP_NAME,
        api: {
            prefix: validatedEnv.API_PREFIX,
            title: validatedEnv.API_TITLE,
            description: validatedEnv.API_DESC,
            version: validatedEnv.API_VERSION,
        },
    },
    security: {
        bcryptSaltRounds: validatedEnv.BCRYPT_SALT_ROUNDS,
        jwtSecret: validatedEnv.JWT_SECRET,
    },
    swagger: {
        user: validatedEnv.SWAGGER_USER,
        password: validatedEnv.SWAGGER_PASSWORD,
    },
    database: {
        url: validatedEnv.DATABASE_URL,
        synchronize: validatedEnv.TYPEORM_SYNCHRONIZE,
        logging: validatedEnv.TYPEORM_LOGGING,
        autoLoadEntities: validatedEnv.TYPEORM_AUTOLOAD_ENTITIES,
        entities: validatedEnv.TYPEORM_ENTITIES,
        migrations: validatedEnv.TYPEORM_MIGRATIONS,
        migrationsDir: validatedEnv.TYPEORM_MIGRATIONS_DIR,
    },
    mongodb: {
        uri: validatedEnv.MONGODB_URL,
    },
    redis: {
        url: validatedEnv.REDIS_URL,
    },
};

export type Env = typeof ENV;