import { describe, test, expect } from "vitest";
import { Tetris } from "../Juego/tetris";
import { PieceSquare } from "../Piece/Piecesquare";
import { Piecet } from "../Piece/Piecet";

describe("Tetris", () => {

    const squareFactory = () => new PieceSquare();

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

    test("debe mover la pieza hacia la izquierda", () => {
        const game = new Tetris(squareFactory);

        game.start();

        const initial = game.getCurrentPiecePosition()!;

        const moved = game.moveLeft();

        if (initial.column > 0) {
            expect(moved).toBe(true);
        }
    });

   test("debe mover la pieza hacia un lado disponible", () => {
        const game = new Tetris(squareFactory);

        game.start();

        const initial = game.getCurrentPiecePosition()!;

        // Intentamos mover según la disponibilidad del borde para evitar falsos positivos por límites
        if (initial.column > 0) {
            const movedLeft = game.moveLeft();
            expect(movedLeft).toBe(true);
        } else {
            const movedRight = game.moveRight();
            expect(movedRight).toBe(true);
        }
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

});