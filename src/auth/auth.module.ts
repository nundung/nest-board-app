import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { typeORMConfig } from 'src/configs/typeorm.config';
import { TypeOrmExModule } from 'src/configs/typeorm-ex.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'nundungsugar',
            signOptions: { expiresIn: 3600 },
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        TypeOrmExModule.forCustomRepository([UserRepository]),
        JwtModule,
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
