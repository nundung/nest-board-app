import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Board } from './board.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
