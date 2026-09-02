import { describe, expect, test } from "vitest";
import { Board } from "../board/board";

describe("Board", () => {

    test("el tablero puede tener otras dimensiones", () => {
        const board = new Board(5, 10);

        expect(board.width).toBe(5);
        expect(board.height).toBe(10);
    });

});