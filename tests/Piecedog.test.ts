import {describe, test,expect } from 'vitest';
import { PieceDog } from '../Piece/Piecedog';

describe('PieceDog', () => {
   test("tiene cuatro elementos", () => {
        const piece = new PieceDog();

        expect(piece.getCells()).toHaveLength(4);
    });

    test("tiene laforma inicial correcta", () => {
        const piece = new PieceDog();   

        expect(piece.getCells()).toEqual([
            { row: 0, column: 1 },
            { row: 0, column: 2 },
            { row: 1, column: 0 },
            { row: 1, column: 1 }
        ]);
    });


test ("cambiar al rotar",() => {
    const piece = new PieceDog();
    piece.rotateRight();

    expect(piece.getCells()).toEqual([
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 1, column: 2 }
    ]);
 });
test("vuelve a la forma inicial al rotar dos veces", () => {
    const piece = new PieceDog();
    const initialShape = piece.getCells();
   
    piece.rotateLeft();
    piece.rotateLeft();

    expect(piece.getCells()).toEqual(initialShape);
        });
});