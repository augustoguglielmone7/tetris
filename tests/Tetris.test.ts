import { describe, test, expect } from "vitest";
import { Tetris } from "../Juego/tetris";
import { PieceSquare } from "../Piece/Piecesquare";
import { Piecet } from "../Piece/Piecet";
import type { RandomSource } from "../Juego/randomsource";

describe("Tetris", () => {

    const squareFactory = () => new PieceSquare();
    const fixedRandom: RandomSource = {
        nextInt: () => 0
    };

    test("debe instanciarse correctamente", () => {
        const game = new Tetris(squareFactory);

        expect(game).toBeDefined();
        expect(game.getBoard()).toBeDefined();
    });

    test("debe tener un tablero de 10x20", () => {
        const game = new Tetris(squareFactory);

        expect(game.getBoard().getWidth()).toBe(10);
        expect(game.getBoard().getHeight()).toBe(20);
    });

    test("debe comenzar en estado NotStarted", () => {
        const game = new Tetris(squareFactory);

        expect(game.getStateName()).toBe("NotStarted");
    });

    test("debe comenzar el juego sin errores", () => {
        const game = new Tetris(squareFactory);

        expect(() => {
            game.start();
        }).not.toThrow();
    });

    test("debe crear una pieza al iniciar", () => {
        const game = new Tetris(squareFactory);

        game.start();

        expect(game.getCurrentPiece()).not.toBeNull();
    });

    test("debe poder obtener la posición de la pieza actual", () => {
        const game = new Tetris(squareFactory);

        game.start();

        expect(game.getCurrentPiecePosition()).not.toBeNull();
    });

    test("debe poder obtener las celdas de la pieza actual", () => {
        const game = new Tetris(squareFactory);

        game.start();

        const cells = game.getCurrentPieceCells();

        expect(cells).toHaveLength(4);
    });

    test("debe mover la pieza hacia la derecha", () => {
        const game = new Tetris(squareFactory, Infinity, fixedRandom);

        game.start();
        game.getClock().pause();

        expect(game.moveRight()).toBe(true);
    });

   test("debe mover la pieza hacia un lado disponible", () => {
        const game = new Tetris(squareFactory);

        game.start();

        const initial = game.getCurrentPiecePosition()!;

        const moved = initial.column > 0
            ? game.moveLeft()
            : game.moveRight();

        expect(moved).toBe(true);
    });

    test("debe rotar una pieza T", () => {
        const tFactory = () => new Piecet();
        const game = new Tetris(tFactory);

        game.start();

        expect(() => {
            game.rotateLeft();
        }).not.toThrow();

        expect(() => {
            game.rotateRight();
        }).not.toThrow();
    });

    test("debe comenzar con cero líneas eliminadas", () => {
        const game = new Tetris(squareFactory);

        expect(game.getClearedLines()).toBe(0);
    });

    test("no debe alcanzar el objetivo al comenzar", () => {
        const game = new Tetris(squareFactory, 10);

        expect(game.hasReachedLineTarget()).toBe(false);
    });

    test("debe poder obtener el Clock", () => {
        const game = new Tetris(squareFactory);

        expect(game.getClock()).toBeDefined();
    });

    test("debe poder pausar el Clock", () => {
        const game = new Tetris(squareFactory);

        expect(() => {
            game.getClock().pause();
        }).not.toThrow();
    });
    test("debe terminar al alcanzar el objetivo de líneas", () => {
    const game = new Tetris(squareFactory, 1, fixedRandom);
    
    for (let column = 2; column < 10; column++) {
        game.getBoard().occupyCell({ row: 19, column });
    }
    game.start();
    game.getClock().pause();

    for (let tick = 0; tick < 19; tick++) {
        game.tick();
    }

    expect(game.getClearedLines()).toBe(1);
    expect(game.getStateName()).toBe("Finished");
});
test("debe terminar en Finished por game over al no poder spawnear la siguiente pieza", () => {
    const game = new Tetris(squareFactory, Infinity, fixedRandom);
    game.start();            
    game.getClock().pause();

   
    for (let column = 2; column <= 8; column++) {
        game.getBoard().occupyCell({ row: 0, column });
        game.getBoard().occupyCell({ row: 1, column });
    }

    game.getBoard().occupyCell({ row: 2, column: 0 });
    game.getBoard().occupyCell({ row: 2, column: 1 });

    game.tick(); 

    expect(game.getCurrentPiece()).toBeNull();
    expect(game.getStateName()).toBe("Finished");
});
});