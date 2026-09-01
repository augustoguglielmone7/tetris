import { Piecestick } from '../Piece/Piecestick';
import { describe, it, expect } from 'vitest';

describe ('Piecestick Test', () => {
    it('debe crear una pieza I correctamente y tener 4 elementos', () => {      
    const piecestick = new Piecestick();
    expect(piecestick).toBeDefined();
    expect(piecestick).not.toBeNull();
    });     

    it('la pieza I debe poder rotar a izquierda y derecha', () => {
        const piecestick = new Piecestick();
        expect(typeof piecestick.rotateLeft).toBe('function');
        expect(typeof piecestick.rotateRight).toBe('function');
        piecestick.rotateLeft();
        piecestick.rotateRight();
    });

});




