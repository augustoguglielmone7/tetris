import type { Tetris } from "./tetris";
import type { ITetrisState, TetrisStateName } from "../interfaces/ITetrisState";
import type { PieceBase } from "../Piece/Piecebase";
import { FinishedState } from "./finishedstate";
import { RunningState } from "./runningstate";

export class NotStartedState implements ITetrisState {
public readonly name: TetrisStateName = "NotStarted";

 public start(tetris: Tetris): void {
        tetris.setState(new RunningState());

        const spawned = tetris.trySpawnPiece(); 

        spawned
            ? tetris.getClock().start()
            : tetris.setState(new FinishedState());
    }

    public tick(tetris: Tetris): void {}
    public moveLeft(tetris: Tetris): boolean {
        return this.tryMove(tetris, -1);
    }

    public moveRight(tetris: Tetris): boolean {
        return this.tryMove(tetris, 1);
    }

    public rotateLeft(tetris: Tetris): boolean {
        return this.tryRotate(tetris, piece => piece.rotateLeft(), piece => piece.rotateRight());
    }

    public rotateRight(tetris: Tetris): boolean {
        return this.tryRotate(tetris, piece => piece.rotateRight(), piece => piece.rotateLeft());
    }

    private tryMove(tetris: Tetris, deltaColumn: number): boolean {
        const active = tetris.getCurrentPiece()!;
        const nextColumn = active.position.column + deltaColumn;
        const canMove = tetris.getBoard().canPlacePiece(
            active.piece.getCells(),
            active.position.row,
            nextColumn
        );

        canMove && tetris.setCurrentPiece({ piece: active.piece, position: { row: active.position.row, column: nextColumn } });

        return canMove;
    }

    private tryRotate(tetris: Tetris, rotate: (piece: PieceBase) => void, revert: (piece: PieceBase) => void): boolean {
        const active = tetris.getCurrentPiece()!;

        rotate(active.piece);

        const canRotate = tetris.getBoard().canPlacePiece(
            active.piece.getCells(),
            active.position.row,
            active.position.column
        );

        canRotate || revert(active.piece);

        return canRotate;
    }
}