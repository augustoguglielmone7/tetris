import { describe, test, expect } from 'vitest';
import { PieceBase } from '../Piece/Piecebase';

class TestPiece extends PieceBase {
    constructor() {
        super('TestPiece', [
            [
                { row: 0, column: 0 },
                { row: 0, column: 1 }
            ],
            [
                { row: 0, column: 0 },
                { row: 1, column: 0 }
            ]
        ]);
    }
}

describe('PieceBase', () => {
    test('debe devolver las celdas de la orientación inicial', () => {
        const piece = new TestPiece();

        expect(piece.getCells()).toEqual([
            { row: 0, column: 0 },
            { row: 0, column: 1 }
        ]);
    });
});
test('debe cambiar de orientación al rotar a la izquierda', () => {
    const piece = new TestPiece();

    piece.rotateLeft();

    expect(piece.getCells()).toEqual([
        { row: 0, column: 0 },
        { row: 1, column: 0 }
    ]);
});
test('debe cambiar de orientación al rotar a la derecha', () => {
    const piece = new TestPiece();

    piece.rotateRight();

    expect(piece.getCells()).toEqual([
        { row: 0, column: 0 },
        { row: 1, column: 0 }
    ]);
});