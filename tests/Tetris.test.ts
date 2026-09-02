import { describe, test, expect } from 'vitest';
import { Tetris } from '../Juego/tetris';
import { PieceSquare } from '../Piece/Piecesquare';

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
});