import { describe, expect, test } from "vitest";
import { Board } from "../board/board";

describe("Board", () => {

    test("una celda dentro del tablero debe ser válida", () => {
        const board = new Board();

        expect(board.isInsideBounds({
            row: 5,
            column: 5
        })).toBe(true);
    });

    test("una celda fuera del tablero no debe ser válida", () => {
        const board = new Board();

        expect(board.isInsideBounds({
            row: 20,
            column: 5
        })).toBe(false);
    });

    test("una celda puede ser marcada como ocupada", () => {
        const board = new Board();

        board.occupyCell({
            row: 5,
            column: 5
        });

        expect(board.isOccupied({
            row: 5,
            column: 5
        })).toBe(true);
    });

    test("puede agregar una pieza completa", () => {
        const board = new Board();
        const piece = [
            { row: 0, column: 0 },
            { row: 0, column: 1 },
            { row: 1, column: 0 },
            { row: 1, column: 1 }
        ];

        expect(board.addPiece(piece)).toBe(true);
        expect(board.getOccupiedCells()).toEqual(piece);
    });

    test("no agrega una pieza que se sale de los límites", () => {
        const board = new Board();
        const piece = [
            { row: 0, column: 8 },
            { row: 0, column: 9 },
            { row: 1, column: 8 },
            { row: 1, column: 10 }
        ];

        expect(board.addPiece(piece)).toBe(false);
        expect(board.getOccupiedCells()).toEqual([]);
    });

    test("una celda que no fue ocupada debe estar libre", () => {
        const board = new Board();

        expect(board.isOccupied({
            row: 5,
            column: 5
        })).toBe(false);
    });
    test("una celda ocupada puede ser liberada", () => {
        const board = new Board();

        board.occupyCell({
            row: 5,
            column: 5
        });

        board.clearCell({
            row: 5,
            column: 5
        });

        expect(board.isOccupied({
            row: 5,
            column: 5
        })).toBe(false);
    });

    test("el tablero debe tener un ancho de 10 columnas por defecto", () => {
        const board = new Board();

        expect(board.getWidth()).toBe(10);
    });

    test("el tablero debe tener un alto de 20 filas por defecto", () => {
        const board = new Board();

        expect(board.getHeight()).toBe(20);
    });

    test("debe devolver las celdas ocupadas", () => {
        const board = new Board();

        board.occupyCell({
            row: 5,
            column: 5
        });

        board.occupyCell({
            row: 6,
            column: 5
        });

        expect(board.getOccupiedCells()).toEqual([
            { row: 5, column: 5 },
            { row: 6, column: 5 }
        ]);
    });
        test("una fila completa debe ser detectada", () => {
        const board = new Board();

        for (let column = 0; column < board.getWidth(); column++) {
            board.occupyCell({
                row: 0,
                column
            });
        }

        expect(board.isRowFull(0)).toBe(true);
    });

    test("una fila incompleta no debe ser detectada como completa", () => {
        const board = new Board();

        for (let column = 0; column < board.getWidth() - 1; column++) {
            board.occupyCell({
                row: 0,
                column
            });
        }

        expect(board.isRowFull(0)).toBe(false);
    });

    test("debe eliminar una fila completa", () => {
        const board = new Board();

        for (let column = 0; column < board.getWidth(); column++) {
            board.occupyCell({
                row: 0,
                column
            });
        }

        board.clearFullRows();

        expect(board.isRowFull(0)).toBe(false);
        expect(board.getOccupiedCells()).toEqual([]);
    });
        test("las filas superiores deben bajar al eliminar una fila completa", () => {
        const board = new Board();

        // Completar la fila inferior
        for (let column = 0; column < board.getWidth(); column++) {
            board.occupyCell({
                row: board.getHeight() - 1,
                column
            });
        }

        // Una celda en la fila de arriba
        board.occupyCell({
            row: board.getHeight() - 2,
            column: 3
        });

        board.clearFullRows();

        expect(board.isOccupied({
            row: board.getHeight() - 1,
            column: 3
        })).toBe(true);
        
    });
    test("debe informar cuántas filas completas elimina", () => {
    const board = new Board(4, 4);

    [2, 3].forEach(row => {
        for (let column = 0; column < board.getWidth(); column++) {
            board.occupyCell({ row, column });
        }
    });

    const removedRows = board.clearFullRows();

    expect(removedRows).toBe(2);
});
});
