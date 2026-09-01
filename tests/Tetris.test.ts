import { describe, test, expect } from 'vitest';
import { Tetris } from '../Juego/tetris';

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
});