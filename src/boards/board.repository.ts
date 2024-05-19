import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async CreateBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
        });
        await this.save(board);
        return board;
    }
}
