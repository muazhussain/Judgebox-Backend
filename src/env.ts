import { config } from 'dotenv';
import { z } from 'zod';
import * as path from 'path';

interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
    autoLoadEntities: boolean;
    entities: string;
    migrations: string;
    migrationsDir: string;
}

interface MongoConfig {
    uri: string;
}

interface RedisConfig {
    host: string;
    port: number;
}

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
    database: DatabaseConfig;
    mongodb: MongoConfig;
    redis: RedisConfig;
}

// Environment variable validation schema
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

    // PostgreSQL Database configuration
    TYPEORM_CONNECTION: z.string(),
    TYPEORM_HOST: z.string(),
    TYPEORM_PORT: z.string().transform(Number),
    TYPEORM_USERNAME: z.string(),
    TYPEORM_PASSWORD: z.string(),
    TYPEORM_DATABASE: z.string(),
    TYPEORM_SYNCHRONIZE: z.string().transform((val) => val === 'true'),
    TYPEORM_LOGGING: z.string().transform((val) => val === 'true'),
    TYPEORM_AUTOLOAD_ENTITIES: z.string().transform((val) => val === 'true'),
    TYPEORM_ENTITIES: z.string(),
    TYPEORM_MIGRATIONS: z.string(),
    TYPEORM_MIGRATIONS_DIR: z.string(),

    // MongoDB configuration
    MONGODB_URI: z.string(),

    // Redis configuration
    REDIS_HOST: z.string(),
    REDIS_PORT: z.string().transform(Number),
});

// Load environment variables
config({
    path: path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'dev'}`),
});

// Validate and transform environment variables
const validatedEnv = envSchema.parse(process.env);

// Create and export the typed environment configuration
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
        type: validatedEnv.TYPEORM_CONNECTION,
        host: validatedEnv.TYPEORM_HOST,
        port: validatedEnv.TYPEORM_PORT,
        username: validatedEnv.TYPEORM_USERNAME,
        password: validatedEnv.TYPEORM_PASSWORD,
        database: validatedEnv.TYPEORM_DATABASE,
        synchronize: validatedEnv.TYPEORM_SYNCHRONIZE,
        logging: validatedEnv.TYPEORM_LOGGING,
        autoLoadEntities: validatedEnv.TYPEORM_AUTOLOAD_ENTITIES,
        entities: validatedEnv.TYPEORM_ENTITIES,
        migrations: validatedEnv.TYPEORM_MIGRATIONS,
        migrationsDir: validatedEnv.TYPEORM_MIGRATIONS_DIR,
    },
    mongodb: {
        uri: validatedEnv.MONGODB_URI,
    },
    redis: {
        host: validatedEnv.REDIS_HOST,
        port: validatedEnv.REDIS_PORT,
    },
};

// Export the validated environment type
export type Env = typeof ENV;