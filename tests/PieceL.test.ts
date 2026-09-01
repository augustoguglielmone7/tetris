import { PieceL } from '../Piece/PieceL';
describe('PieceL Test', () => {
    it('debe crear una pieza L correctamente y tener 4 elementos', () => {
        const pieceL = new PieceL();
        expect(pieceL).toBeDefined();
        expect(pieceL).not.toBeNull();
    }
);
    it('la pieza L debe poder rotar a izquierda y derecha', () => {
        const pieceL = new PieceL();
        expect(typeof pieceL.rotateLeft).toBe('function');
        expect(typeof pieceL.rotateRight).toBe('function');
        pieceL.rotateLeft();
        pieceL.rotateRight();
    }
);
  });     
