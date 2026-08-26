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
 private readonly orientations: cell[][];

 public readonly name: string;

 protected constructor(name: string, orientations: cell[][]) {
    this.name = name;
    this.orientations = orientations;
    this.orientationIndex = 0;
}

 public get currentOrientation(): cell[] {
    return this.orientations[this.orientationIndex].map(cell => ({
        row: cell.row,
        columb: cell.columb
     }));
 public rotateLeft(): void {
    this.orientationIndex = (this.orientationIndex - 1 + this.orientations.length) % this.orientations.length;
    
}