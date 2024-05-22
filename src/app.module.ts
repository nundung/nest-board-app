import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { TypeOrmExModule } from './configs/typeorm-ex.module';
import { BoardRepository } from './boards/board.repository';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './auth/user.repository';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: { expiresIn: jwtConfig.expiresIn },
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        TypeOrmExModule.forCustomRepository([BoardRepository]),
        TypeOrmExModule.forCustomRepository([UserRepository]),
        BoardsModule,
        AuthModule,
    ],
    controllers: [BoardsController, AuthController],
    providers: [BoardsService, AuthService],
})
export class AppModule {}
