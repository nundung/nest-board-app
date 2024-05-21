import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(BoardRepository)
        // “커스텀 레포지터리”는 @InjectRepository데코레이터를 사용하지 않는다
        private boardRepository: BoardRepository,
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async getMyAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id });
        const boards = await query.getMany();
        return boards;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({
            where: { id: id },
        });
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User,
    ): Promise<Board> {
        return this.boardRepository.CreateBoard(createBoardDto, user);
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log('result', result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
