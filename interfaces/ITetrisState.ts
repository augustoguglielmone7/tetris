import type { Tetris } from "../Juego/tetris";

export type TetrisStateName =
    "NotStarted" |
    "Running" |
    "Finished";

export interface ITetrisState {

    readonly name: TetrisStateName;

    start(tetris: Tetris): void;

    tick(tetris: Tetris): void;

    moveLeft(tetris: Tetris): boolean;

    moveRight(tetris: Tetris): boolean;

    rotateLeft(tetris: Tetris): boolean;

    rotateRight(tetris: Tetris): boolean;
}