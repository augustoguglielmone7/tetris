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
});