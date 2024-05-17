import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.PSQL_HOST,
    port: parseInt(process.env.PSQL_PORT),
    username: process.env.PSQL_USER,
    password: process.env.PSQL_PW,
    database: process.env.PSQL_DATABASE,
    entities: [__dirname + '../**/*.entity.{js,ts}'],
    synchronize: true,
};
