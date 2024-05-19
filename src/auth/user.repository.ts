import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './uer.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
