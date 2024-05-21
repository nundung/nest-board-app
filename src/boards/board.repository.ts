import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async CreateBoard(
        createBoardDto: CreateBoardDto,
        user: User,
    ): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
        });
        await this.save(board);
        return board;
    }
}
