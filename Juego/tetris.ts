import {Board} from "../board/board";
import { Cell } from "../interfaces/interfac";
import { PieceBase } from "../Piece/Piecebase";
import { PieceDog } from "../Piece/Piecedog";
import { PieceL } from "../Piece/PieceL";
import { PieceSquare } from "../Piece/Piecesquare";
import { Piecestick } from "../Piece/Piecestick";
import { Piecet } from "../Piece/Piecet";
import {Clock} from "./Clock";

export class Tetris {
    private board: Board
    private clock: Clock
    private isGameOver: boolean = false;
    private currentPiece: PieceBase | null = null;
    private currentPiecePosition: Cell = { row: 0, column: 0 };
   
 

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
        if (!this.currentPiece) {
            this.spawnPiece();
            return;
        }

        this.currentPiecePosition = {
            row: this.currentPiecePosition.row + 1,
            column: this.currentPiecePosition.column,
        };
    }

    public spawnPiece(): void {
        const pieceTypes = [
            new Piecestick(),
            new PieceSquare(),
            new PieceL(),
            new PieceDog(),
            new Piecet(),
            
        ];
        const randomIndex = Math.floor(Math.random() * pieceTypes.length);
        this.currentPiece = pieceTypes[randomIndex];
        this.currentPiecePosition = {
            row: 0,
            column: Math.floor(this.board.getWidth() / 2) - 1,
        };
    }

    public moveLeft(): void {
        if (!this.currentPiece) {
            this.spawnPiece();
        }

        this.currentPiecePosition = {
            row: this.currentPiecePosition.row,
            column: this.currentPiecePosition.column - 1,
        };
    }

    public moveRight(): void {
        if (!this.currentPiece) {
            this.spawnPiece();
        }

        this.currentPiecePosition = {
            row: this.currentPiecePosition.row,
            column: this.currentPiecePosition.column + 1,
        };
    }

    public getCurrentPiece(): PieceBase | null {
        return this.currentPiece;
    }

    public getCurrentPiecePosition(): Cell {
        return { ...this.currentPiecePosition };
    }
     
    public getBoard(): Board {
        return this.board;
    }
}