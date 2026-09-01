
import { PieceBase } from "../Piece/Piecebase";
import {RandomSource} from "../Juego/randomsource";
export type PieceFactory = () => PieceBase;

type SpawnCandidate = {
    orientationIndex: number;
    columns: number[];
};

const SpawnRow = 0;

export class PieceGenerator {
    private readonly _randomSource: RandomSource;
    private readonly _pieceFactory: PieceFactory;

    constructor(_randomSource: RandomSource, _pieceFactory: PieceFactory) {
        this._randomSource = _randomSource;
        this._pieceFactory = _pieceFactory;
    }

    public next(_board: Board): ActivePiece | null {
        const _piece = this._pieceFactory();
        const _candidates = this.findSpawnCandidates(_board, _piece);
        const _candidate = _candidates.length === 0
            ? null
            : _candidates[this._randomSource.nextInt(_candidates.length)];

        Array.from({ length: _candidate?.orientationIndex ?? 0 })
            .forEach(() => _piece.rotateLeft());

        const _columns = _candidate?.columns ?? [];
        const _column = _candidate === null
            ? 0
            : _columns[this._randomSource.nextInt(_columns.length)];

        return _candidate === null
            ? null
            : { piece: _piece, position: { row: SpawnRow, column: _column } };
    }

    private findSpawnCandidates(_board: Board, _piece: PieceBase): SpawnCandidate[] {
        return Array.from({ length: _piece.getOrientationCount() }, (_value, _orientationIndex) => {
            const _columns = Array.from({ length: BoardAncho }, (_columnValue, _column) => _column)
                .filter(_column => _board.canPlacePiece(_piece.getCells(), SpawnRow, _column));

            _piece.rotateLeft();

            return { orientationIndex: _orientationIndex, columns: _columns };
        }).filter(_candidate => _candidate.columns.length > 0);
    }
}