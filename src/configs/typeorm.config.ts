import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';
import { User } from 'src/auth/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '1234',
    database: 'board-app',
    entities: [Board, User],
    synchronize: true,
};
