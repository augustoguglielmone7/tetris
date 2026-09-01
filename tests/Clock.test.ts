import {describe, test, expect} from 'vitest';
import {Clock} from '../Juego/Clock';

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
        expect(ticks).toBeGreaterThanOrEqual(2);
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

});
        
       
