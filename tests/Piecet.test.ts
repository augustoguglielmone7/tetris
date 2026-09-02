import { describe, test, expect } from 'vitest';
import { Piecet } from '../Piece/Piecet';
describe('Piecet Test', () => {
    test('debe crear una pieza T correctamente y tener 4 elementos', () => {
    const pieceT = new Piecet();

    expect(pieceT.getCells()).toHaveLength(4);

    expect(pieceT.getCells()).toEqual([
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 }
    ]);
});

    test('la pieza T debe poder rotar a izquierda y derecha', () => {
        const pieceT = new Piecet(); 
        
        expect(typeof pieceT.rotateLeft).toBe('function');
        expect(typeof pieceT.rotateRight).toBe('function');

        pieceT.rotateLeft();
        pieceT.rotateRight();
    });
});