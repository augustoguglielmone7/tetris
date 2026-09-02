import { describe, test, expect } from 'vitest';
import { Tetris } from '../Juego/tetris';
import { PieceSquare } from '../Piece/Piecesquare';
import { Piecet } from '../Piece/Piecet';

describe('Tetris Test', () => {
    test('debe instanciarse de forma correcta con un tablero', () => {
        const game = new Tetris();

        expect(game).toBeDefined();
        expect(game.getBoard()).toBeDefined();
    });

    test('debe iniciar el juego sin errores', () => {
        const game = new Tetris();

        expect(() => {
            game.start();
        }).not.toThrow();
    });

    test('debe pausar el juego sin errores', () => {
        const game = new Tetris();

        expect(() => {
            game.start();
            game.pause();
        }).not.toThrow();
    });

    test('debe crear un tablero con dimensiones por defecto', () => {
        const game = new Tetris();

        expect(game.getBoard().getWidth()).toBe(10);
        expect(game.getBoard().getHeight()).toBe(20);
    });

    test('debe mover la pieza a la izquierda y a la derecha respetando los bordes', () => {
        const game = new Tetris(10, 20);

        (game as any).currentPiece = new PieceSquare();
        (game as any).currentOffset = { row: 0, column: 1 };

        expect(game.moveLeft()).toBe(true);
        expect(game.getCurrentOffset()).toEqual({ row: 0, column: 0 });

        (game as any).currentOffset = { row: 0, column: 0 };
        expect(game.moveLeft()).toBe(false);

        (game as any).currentOffset = { row: 0, column: 7};
        expect(game.moveRight()).toBe(true);
        expect(game.getCurrentOffset()).toEqual({ row: 0, column: 8});

        (game as any).currentOffset = { row: 0, column: 8 };
        expect(game.moveRight()).toBe(false);
        
    });
   test('cada tick debe bajar la pieza activa una fila si puede', () => {
    const game = new Tetris(10, 20);

    (game as any).currentPiece = new PieceSquare();
    (game as any).currentOffset = { row: 0, column: 1 };

    game.tick();

    expect(game.getCurrentOffset()).toEqual({
        row: 1,
        column: 1
    });
    
}); 
test('debe fijar la pieza en el tablero cuando no puede bajar', () => {
    const game = new Tetris(10, 20);

    (game as any).currentPiece = new PieceSquare();
    (game as any).currentOffset = { row: 18, column: 1 };

    game.tick();

    expect(game.getBoard().isOccupied({
        row: 18,
        column: 1
    })).toBe(true);

    expect(game.getBoard().isOccupied({
        row: 19,
        column: 2
    })).toBe(true);
});
test('debe crear una nueva pieza después de fijar la actual', () => {
    const game = new Tetris(10, 20);
    const currentPiece = new PieceSquare();

    (game as any).currentPiece = currentPiece;
    (game as any).currentOffset = { row: 18, column: 1 };

    game.tick();

    expect(game.getCurrentPiece()).not.toBe(currentPiece);

    expect(game.getCurrentOffset()).toEqual({
        row: 0,
        column: 4
    });
});
test('debe rotar la pieza activa cuando hay espacio disponible', () => {
    const game = new Tetris(10, 20);

    (game as any).currentPiece = new Piecet();
    (game as any).currentOffset = { row: 0, column: 1 };

    game.rotate();

    expect(game.getAbsoluteCells()).toEqual([
        { row: 0, column: 2 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 2, column: 2 }
    ]);
    });
    test('debe contar una línea cuando se completa y elimina', () => {
    const game = new Tetris(10, 20);
    const board = game.getBoard();

    for (let column = 0; column < board.getWidth(); column++) {
        if (column !== 1 && column !== 2) {
            board.occupyCell({ row: 19, column });
        }
    }

    (game as any).currentPiece = new PieceSquare();
    (game as any).currentOffset = { row: 18, column: 1 };

    game.tick();

    expect(game.getLinesCleared()).toBe(1);
});

});