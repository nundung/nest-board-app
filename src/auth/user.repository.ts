import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword });
        // const user = this.create({ username: username, password: password });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
        await this.save(user);
        return;
    }
}
