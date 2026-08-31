import { Cell } from "../interfaces/interfac";

export class Board {
    //define el ancho y alto del tablero
    public readonly width: number;
    public readonly height: number;

    // por defecto el tablero tiene 10 columnas y 20 filas
    constructor(width: number = 10, height: number = 20) {
        this.width = width;
        this.height = height;
    }
 // comprobar si la celda está dentro de los límites del tablero.
    public isInsideBounds(cell: Cell): boolean {
        return cell.row >= 0 &&
            cell.row < this.height &&
            cell.column >= 0 &&
            cell.column < this.width;
    }


}