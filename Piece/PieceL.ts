import { PieceBase } from "./Piecebase";

export class PieceL extends PieceBase {
    constructor() {
        super("Piecel", [
            [
                { row: 0, column: 2 },
                { row: 1, column: 0 },
                { row: 1, column: 1 },
                { row: 1, column: 2 }
            ],
            [
                { row: 0, column: 1 },
                { row: 1, column: 1 },
                { row: 2, column: 1 },
                { row: 2, column: 2 }
            ],
            [
                { row: 0, column: 0 },
                { row: 0, column: 1 },
                { row: 0, column: 2 },
                { row: 1, column: 0 }
            ],
            [
                { row: 0, column: 0 },
                { row: 0, column: 1 },
                { row: 1, column: 1 },
                { row: 2, column: 1 }
            ]
        ]);
    }
}
