import { describe, expect, test } from "vitest";
import { PieceSquare } from "../Piece/Piecesquare";

describe("PieceSquare", () => {
    test("se crea correctamente", () => {
        const piece = new PieceSquare();

        expect(piece).toBeInstanceOf(PieceSquare);
        expect(piece.name).toBe("SquarePiece");
    });

    test("tiene cuatro elementos", () => {
        const piece = new PieceSquare();

        expect(piece.getCells()).toHaveLength(4);
    });

    test("tiene forma cuadrada", () => {
        const piece = new PieceSquare();

        expect(piece.getCells()).toEqual([
            { row: 0, column: 0 },
            { row: 0, column: 1 },
            { row: 1, column: 0 },
            { row: 1, column: 1 },
        ]);
    });

    test("no cambia al rotar", () => {
        const piece = new PieceSquare();
        const initialShape = piece.getCells();

        piece.rotateRight();

        expect(piece.getCells()).toEqual(initialShape);
    });
});