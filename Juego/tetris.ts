import {Board} from "../board/board";
import {Clock} from "./Clock";
export class Tetris {
    private board: Board
    private clock: Clock
    private isGameOver: boolean = false;

    constructor(width: number=10, height: number=20) {
        this.board = new Board(width, height);
        this.clock = new Clock(() => this.tick(), 1000);
    }
 public start(): void {
    !this.isGameOver && this.clock.start();
 }
 public pause(): void {
    this.clock.pause();
    }

    public tick(): void {
    }
     public getBoard(): Board {
        return this.board;
     }
    }