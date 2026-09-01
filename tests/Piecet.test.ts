import { Piecet } from '../Piece/Piecet';
describe('Piecet Test', () => {
    it('debe crear una pieza T correctamente y tener 4 elementos', () => {
        const pieceT = new Piecet();
        expect(pieceT).toBeDefined();
        expect(pieceT).not.toBeNull();
    });

    it('la pieza T debe poder rotar a izquierda y derecha', () => {
        const pieceT = new Piecet();
        
        expect(typeof pieceT.rotateLeft).toBe('function');
        expect(typeof pieceT.rotateRight).toBe('function');

        pieceT.rotateLeft();
        pieceT.rotateRight();
    });
});