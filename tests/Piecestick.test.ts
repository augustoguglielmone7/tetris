import { Piecestick } from '../Piece/Piecestick';
import { describe, test, expect } from 'vitest';

describe ('Piecestick Test', () => {
 test('debe crear una pieza I correctamente y tener 4 elementos', () => {
    const pieceI = new Piecestick();

    expect(pieceI.getCells()).toHaveLength(4);

    expect(pieceI.getCells()).toEqual([
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 2, column: 0 },
        { row: 3, column: 0 }
    ]);
});

    test('la pieza I debe rotar horizontalmente y volver a su forma inicial', () => {
    const pieceI = new Piecestick();

    const initialShape = pieceI.getCells();

    pieceI.rotateRight();

    expect(pieceI.getCells()).toEqual([
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 0, column: 2 },
        { row: 0, column: 3 }
    ]);

    pieceI.rotateLeft();

    expect(pieceI.getCells()).toEqual(initialShape);
});
});




