import type { Tetris } from "./tetris";
import type { ITetrisState, TetrisStateName } from "../interfaces/ITetrisState";

export class FinishedState implements ITetrisState {
    public readonly name: TetrisStateName = "Finished";

    public start(tetris: Tetris): void {}
    
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