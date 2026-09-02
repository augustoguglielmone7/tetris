import { PieceL } from '../Piece/PieceL';
import { describe, test, expect } from 'vitest';

describe('PieceL Test', () => {
    test('debe crear una pieza L correctamente y tener 4 elementos', () => {
        const pieceL = new PieceL();

        expect(pieceL.getCells()).toHaveLength(4);

        expect(pieceL.getCells()).toEqual([
            { row: 0, column: 2 },
            { row: 1, column: 0 },
            { row: 1, column: 1 },
            { row: 1, column: 2 }
        ]);
    });

    test('la pieza L debe rotar a la izquierda y volver a su forma inicial', () => {
    const pieceL = new PieceL();

    const initialShape = pieceL.getCells();

    pieceL.rotateLeft();

    expect(pieceL.getCells()).toEqual([
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 2, column: 1 },
        { row: 2, column: 2 }
    ]);

    pieceL.rotateRight();

    expect(pieceL.getCells()).toEqual(initialShape);
});
});