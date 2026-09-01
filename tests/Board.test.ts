import { describe, expect, test } from "vitest";
import { Board } from "../Board/Board";

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

});