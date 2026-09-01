import { Board } from "../board/board";
import { Clock } from "./Clock";
import { Cell } from "../interfaces/interfac";
import { PieceBase } from "../Piece/Piecebase";
import { PieceDog } from "../Piece/Piecedog";
import { PieceL } from "../Piece/PieceL";
import { Piecestick } from "../Piece/Piecestick";
import { Piecet } from "../Piece/Piecet";
import { PieceSquare } from "../Piece/Piecesquare";

// Lista de piezas disponibles (array simple, no es una matriz del tablero)
const PIECE_TYPES: Array<new () => PieceBase> = [
    PieceDog,
    PieceL,
    Piecestick,
    Piecet,
    PieceSquare
];

export class Tetris {
    private board: Board;
    private clock: Clock;
    private isGameOver: boolean = false;

    private currentPiece: PieceBase;
    private currentOffset: Cell;

    constructor(width: number = 10, height: number = 20) {
        this.board = new Board(width, height);
        this.clock = new Clock(() => this.tick(), 1000);

        this.currentPiece = this.createRandomPiece();
        this.currentOffset = this.getSpawnOffset();
    }

    public start(): void {
        !this.isGameOver && this.clock.start();
    }

    public pause(): void {
        this.clock.pause();
    }

    // Avanza un paso del juego: cae la pieza o se fija y se genera la siguiente
    public tick(): void {
        const moved = !this.isGameOver && this.moveDown();
        !moved && !this.isGameOver && this.lockCurrentPiece();
    }

    public getBoard(): Board {
        return this.board;
    }

    public getCurrentPiece(): PieceBase {
        return this.currentPiece;
    }

    public getCurrentOffset(): Cell {
        return { ...this.currentOffset };
    }

    public getIsGameOver(): boolean {
        return this.isGameOver;
    }

    // Celdas de la pieza activa ya traducidas a coordenadas del tablero
    public getAbsoluteCells(): Cell[] {
        return this.currentPiece.getCells().map(cell => ({
            row: cell.row + this.currentOffset.row,
            column: cell.column + this.currentOffset.column
        }));
    }

    public moveDown(): boolean {
        return this.tryMove({ row: this.currentOffset.row + 1, column: this.currentOffset.column });
    }

    public moveLeft(): boolean {
        return this.tryMove({ row: this.currentOffset.row, column: this.currentOffset.column - 1 });
    }

    public moveRight(): boolean {
        return this.tryMove({ row: this.currentOffset.row, column: this.currentOffset.column + 1 });
    }

    // Rota especulativamente y revierte si la nueva forma no entra
    public rotate(): void {
        this.currentPiece.rotateLeft();
        const valid = this.canPlace(this.getAbsoluteCells());
        !valid && this.currentPiece.rotateRight();
    }

    // Intenta mover la pieza activa al nuevo offset; devuelve si pudo moverse
    private tryMove(newOffset: Cell): boolean {
        const cells = this.currentPiece.getCells().map(cell => ({
            row: cell.row + newOffset.row,
            column: cell.column + newOffset.column
        }));

        const valid = this.canPlace(cells);
        this.currentOffset = valid ? newOffset : this.currentOffset;

        return valid;
    }

    // Una posición es válida si todas sus celdas están dentro del tablero y libres
    private canPlace(cells: Cell[]): boolean {
        return cells.every(cell => this.board.isInsideBounds(cell) && !this.board.isOccupied(cell));
    }

    // Fija la pieza actual en el tablero, limpia líneas y genera la próxima
    private lockCurrentPiece(): void {
        this.getAbsoluteCells().forEach(cell => this.board.occupyCell(cell));
        this.board.clearFullRows();

        this.currentPiece = this.createRandomPiece();
        this.currentOffset = this.getSpawnOffset();

        this.isGameOver = !this.canPlace(this.getAbsoluteCells());
        this.isGameOver && this.clock.pause();
    }

    private createRandomPiece(): PieceBase {
        const PieceClass = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
        return new PieceClass();
    }

    private getSpawnOffset(): Cell {
        return { row: 0, column: Math.floor(this.board.getWidth() / 2) - 1 };
    }
}
