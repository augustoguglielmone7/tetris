import { Board } from "../board/board";
import { Cell } from "../interfaces/interfac";
import { PieceBase } from "../Piece/Piecebase";
import { PieceDog } from "../Piece/Piecedog";
import { PieceL } from "../Piece/PieceL";
import { PieceSquare } from "../Piece/Piecesquare";
import { Piecestick } from "../Piece/Piecestick";
import { Piecet } from "../Piece/Piecet";
import { Clock } from "./Clock";

export class Tetris {
    private board: Board;
    private clock: Clock;
    private isGameOver: boolean = false;
    private currentPiece: PieceBase | null = null;
    private currentPiecePosition: Cell = { row: 0, column: 0 };

    constructor(width: number = 10, height: number = 20) {
        this.board = new Board(width, height);
        this.clock = new Clock(() => this.tick(), 1000);
    }

    public start(): void {
        !this.isGameOver && this.clock.start();
    }

    public pause(): void {
        this.clock.pause();
    }

    public spawnPiece(): void {
        const pieceTypes = [
            new Piecestick(),
            new PieceSquare(),
            new PieceL(),
            new PieceDog(),
            new Piecet()
        ];

        const randomIndex = Math.floor(Math.random() * pieceTypes.length);
        this.currentPiece = pieceTypes[randomIndex];
        this.currentPiecePosition = { row: 0, column: 4 };
    }

    private canMove(deltaRow: number, deltaCol: number): boolean {
        return !!this.currentPiece && this.currentPiece.getCells().every((cell) => {
            const nextRow = this.currentPiecePosition.row + cell.row + deltaRow;
            const nextCol = this.currentPiecePosition.column + cell.column + deltaCol;
            const withinColumns = nextCol >= 0 && nextCol < this.board.getWidth();
            const withinRows = nextRow < this.board.getHeight();
            const isFree = nextRow < 0 || !this.board.isOccupied({ row: nextRow, column: nextCol });

            return withinColumns && withinRows && isFree;
        });
    }

    private lockCurrentPiece(): void {
        const hasPiece = !!this.currentPiece;

        hasPiece && this.currentPiece?.getCells().forEach((cell) => {
            const row = this.currentPiecePosition.row + cell.row;
            const column = this.currentPiecePosition.column + cell.column;
            const insideBoard = row >= 0 && row < this.board.getHeight() &&
                column >= 0 && column < this.board.getWidth();

            insideBoard && this.board.occupyCell({ row, column });
        });

        hasPiece && this.board.clearFullRows();
    }

    public tick(): void {
        !this.currentPiece && this.spawnPiece();
        this.currentPiece && this.canMove(1, 0) && (this.currentPiecePosition = {
            row: this.currentPiecePosition.row + 1,
            column: this.currentPiecePosition.column
        });
        this.currentPiece && !this.canMove(1, 0) && (this.lockCurrentPiece(), this.spawnPiece());
    }

    public getBoard(): Board {
        return this.board;
    }

    public getCurrentPiece(): PieceBase | null {
        return this.currentPiece;
    }

    public getCurrentPiecePosition(): Cell {
        return this.currentPiecePosition;
    }
}