import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '1234',
    database: 'board-app',
    entities: [__dirname + '../**/*.entity.{js,ts}'],
    synchronize: true,
};
