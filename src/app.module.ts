import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { TypeOrmExModule } from './configs/typeorm-ex.module';
import { BoardRepository } from './boards/board.repository';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        BoardsModule,
        TypeOrmExModule.forCustomRepository([BoardRepository]),
    ],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class AppModule {}
