import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredetialsDto } from './dto/auth-credential.dto';
import { ConflictException } from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredetialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = this.create({ username: username, password: password });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            }
            console.log('error', error);
        }
        await this.save(user);
        return;
    }
}
