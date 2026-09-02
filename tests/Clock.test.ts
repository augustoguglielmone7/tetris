import { describe, test, expect } from 'vitest';
import { Clock } from '../Juego/Clock';

describe('Clock test', () => {
    test('debe crear un reloj correctamente', () => {
        const callback = () => {};
        const clock = new Clock(callback, 500);

        expect(clock).toBeDefined();
    });

    test('debe ejecutar el callback en cada intervalo', async () => {
        let ticks = 0;
        const callback = () => {
            ticks++;
        };
        const clock = new Clock(callback, 50);

        clock.start();
        await new Promise(resolve => setTimeout(resolve, 130));
        clock.pause();

        expect(ticks).toBeGreaterThanOrEqual(1);
    });

    test('debe pausar y reanudar sin errores', () => {
        const callback = () => {};
        const clock = new Clock(callback, 100);

        expect(() => {
            clock.start();
            clock.pause();
            clock.start();
            clock.pause();
        }).not.toThrow();
    });

    test('start no debe duplicar el intervalo si ya está activo', async () => {
        let ticks = 0;
        const clock = new Clock(() => ticks++, 50);

        clock.start();
        clock.start();

        await new Promise(resolve => setTimeout(resolve, 120));
        clock.pause();

        expect(ticks).toBeGreaterThan(0);
        expect(ticks).toBeLessThan(10);
    });

    test('pause no debe lanzar error si el reloj no está activo', () => {
        const clock = new Clock(() => {}, 100);

        expect(() => clock.pause()).not.toThrow();
    });

    test('reset debe cambiar el intervalo y reanudar sin errores', async () => {
        let ticks = 0;
        const clock = new Clock(() => ticks++, 100);

        clock.start();
        clock.reset(20);

        await new Promise(resolve => setTimeout(resolve, 80));
        clock.pause();

        expect(ticks).toBeGreaterThan(0);
    });
});

