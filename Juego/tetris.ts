import { Board, type ActivePiece as BoardActivePiece, type Position } from "../board/board";
import { ITetrisState, TetrisStateName } from "../interfaces/ITetrisState";
import { NotStartedState } from "../Juego/Notstartstate";
import { Clock } from "./Clock";
import { PieceGenerator, type PieceFactory } from "../Juego/piecegenerator";
import { MathRandomSource, type RandomSource } from "../Juego/randomsource";

export type PiecePosition = Position;

export type { PieceFactory } from "./piecegenerator";

export type ActivePiece = BoardActivePiece;

export class Tetris {
    private readonly board: Board;
    private readonly clock: Clock;
    private readonly pieceGenerator: PieceGenerator;
    private readonly targetLines: number;
    private state: ITetrisState;
    private currentPiece: ActivePiece | null = null;
    private linesCleared: number = 0;

    constructor(
        pieceFactory: PieceFactory,
        targetLines: number = Infinity,
        randomSource: RandomSource = new MathRandomSource()
    ) {
        this.board = new Board();
        this.clock = new Clock(() => this.tick(), 1000);
        this.pieceGenerator = new PieceGenerator(randomSource, pieceFactory);
        this.targetLines = targetLines;
        this.state = new NotStartedState();
    }

    public start(): void {
        this.state.start(this);
    }

    public tick(): void {
        this.state.tick(this);
    }

    public moveLeft(): boolean {
        return this.state.moveLeft(this);
    }

    public moveRight(): boolean {
        return this.state.moveRight(this);
    }

    public rotateLeft(): boolean {
        return this.state.rotateLeft(this);
    }

    public rotateRight(): boolean {
        return this.state.rotateRight(this);
    }

    public getBoard(): Board {
        return this.board;
    }

    public getClock(): Clock {
        return this.clock;
    }

    public getStateName(): TetrisStateName {
        return this.state.name;
    }

    public getCurrentPiecePosition(): PiecePosition | null {
    return this.currentPiece?.position ?? null;
    }

    public getCurrentPieceCells(): PiecePosition[] {
    const active = this.currentPiece!;

    return active.piece.getCells().map(cell => ({
        row: cell.row + active.position.row,
        column: cell.column + active.position.column
    }));
    }

    // A partir de aca: metodos usados por los estados (NotStarted/Running/Finished), no son API de juego para el usuario final.

    public setState(state: ITetrisState): void {
        this.state = state;
    }

   public getCurrentPiece(): ActivePiece | null {
    return this.currentPiece;
    }

    public setCurrentPiece(activePiece: ActivePiece | null): void {
    this.currentPiece = activePiece;
    } 

   public startClock(): void {
    this.clock.start();
    } 

   public pauseClock(): void {
    this.clock.pause();
    }

    public trySpawnPiece(): boolean {
        const activePiece = this.pieceGenerator.next(this.board);
        const canSpawn = activePiece !== null;

        canSpawn && this.setCurrentPiece(activePiece);

        return canSpawn;
    }

    public lockCurrentPiece(): number {
    const active = this.currentPiece!;

    const cells = active.piece.getCells().map(cell => ({
        row: cell.row + active.position.row,
        column: cell.column + active.position.column
    }));

    this.board.addPiece(cells);
    this.currentPiece = null;

    const cleared = this.board.clearFullRows();
    this.linesCleared += cleared;

    return cleared;
    }

    public hasReachedLineTarget(): boolean {
    return this.linesCleared >= this.targetLines;
    }

    public getClearedLines(): number {
    return this.linesCleared;   
    }
}