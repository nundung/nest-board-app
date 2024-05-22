import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';
import { User } from 'src/auth/user.entity';
import * as config from 'config';

const dbConfig = config.get('db');

console.log(config);
export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [Board, User],
    synchronize: dbConfig.synchronize,
};
