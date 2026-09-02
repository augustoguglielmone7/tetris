import { IRotator } from "../interfaces/interfac";
export type Cell = {
    row: number;
    column: number;
};
export abstract class PieceBase 
                    implements IRotator {
 
 private orientationIndex: number;
 private readonly orientations: Cell[][];

 public readonly name: string;

 protected constructor(name: string, orientations: Cell[][]) {
    this.name = name;
    this.orientations = orientations;
    this.orientationIndex = 0;
 }

public getCells(): Cell[] {
    return this.orientations[this.orientationIndex].map(cell => ({
        row: cell.row,
        column: cell.column
    }));
}
public getOrientationCount(): number {
    return this.orientations.length;
}
 public rotateLeft(): void {
    this.orientationIndex = (this.orientationIndex + 1 ) % this.orientations.length;
 }
 public rotateRight(): void {
    this.orientationIndex = (this.orientationIndex - 1 + this.orientations.length) % this.orientations.length; 
 } 
 
}
