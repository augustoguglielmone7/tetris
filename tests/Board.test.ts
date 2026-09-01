import { describe, expect, test } from "vitest";
import { Board } from "../board/Board";

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

});