import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
@Injectable()
export class BoardsService {
    //private을 사용하지 않으면
    //다른 컴포넌트에서 이 board라는 배열값을 수정할수 있다.
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
        };
        this.boards.push(board);
        return board;
    }
}
