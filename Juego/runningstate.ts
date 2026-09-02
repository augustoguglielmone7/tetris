import type { Tetris } from "./tetris";
import type { ITetrisState, TetrisStateName } from "../interfaces/ITetrisState";
import type { PieceBase } from "../Piece/Piecebase";
import { FinishedState } from "../Juego/finishedstate";

export class RunningState implements ITetrisState {
    public readonly name: TetrisStateName = "Running";

    public start(tetris: Tetris): void {}

    public tick(tetris: Tetris): void {
        

        const active = tetris.getCurrentPiece()!;
        const nextRow = active.position.row + 1;
        const canMoveDown = tetris.getBoard().canPlacePiece(
            active.piece.getCells(),
            nextRow,
            active.position.column
        );

        canMoveDown
            ? tetris.setCurrentPiece({ piece: active.piece, position: { row: nextRow, column: active.position.column } })
            : this.lockAndSpawnNext(tetris);
    }

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

    private lockAndSpawnNext(tetris: Tetris): void {
        tetris.lockCurrentPiece();

        const reachedTarget = tetris.hasReachedLineTarget();
        const spawned = !reachedTarget && tetris.trySpawnPiece();

        spawned || tetris.setState(new FinishedState());
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