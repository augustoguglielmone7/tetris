import {PieceBase } from "./Piecebase";

export class PieceSquare extends PieceBase {
    constructor() {
        super("SquarePiece", [
            [
                { row: 0, column: 0 },
                { row: 0, column: 1 },
                { row: 1, column: 0 },
                { row: 1, column: 1 }
            ]
        ]);
    }
}
