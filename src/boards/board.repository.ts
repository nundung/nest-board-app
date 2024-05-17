import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
