import { IRotator } from "../interfaces/interfac";

export abstract class PieceBase 
                    implements IRotator {
    rotateleft(): void {
    }
    rotateright(): void {
    }
}
export type cell = {
    row: number;
    columb: number;
}
 private orientationIndex: number;
 private orientations: cell[][];