import type { Tetris } from "./Tetris";
import type { ITetrisState, TetrisStateName } from "./interfaces/ITetrisState";
import { RunningState } from "./RunningState";
import { FinishedState } from "./FinishedState";

export class NotStartedState implements ITetrisState {
    public readonly name: TetrisStateName = "NotStarted";

    public start(tetris: Tetris): void {
        const spawned = tetris.trySpawnPiece();

        tetris.setState(spawned ? new RunningState() : new FinishedState());
    }

    public tick(tetris: Tetris): void {}

    public moveLeft(tetris: Tetris): boolean {
        return false;
    }

    public moveRight(tetris: Tetris): boolean {
        return false;
    }

    public rotateLeft(tetris: Tetris): boolean {
        return false;
    }

    public rotateRight(tetris: Tetris): boolean {
        return false;
    }
}
