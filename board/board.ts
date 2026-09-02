import { Cell } from "../interfaces/interfac";

export class Board {
    // Define el ancho y alto del tablero
    public readonly width: number;
    public readonly height: number;

    // Guarda las celdas que ya están ocupadas
    private occupiedCells: Set<string>;

    // Por defecto el tablero tiene 10 columnas y 20 filas
    constructor(width: number = 10, height: number = 20) {
        this.width = width;
        this.height = height;
        this.occupiedCells = new Set<string>();
    }

    // Comprueba si la celda está dentro de los límites del tablero
    public isInsideBounds(cell: Cell): boolean {
        return cell.row >= 0 &&
            cell.row < this.height &&
            cell.column >= 0 &&
            cell.column < this.width;
    }

    // Marca una celda como ocupada
    public occupyCell(cell: Cell): void {
        this.occupiedCells.add(`${cell.row},${cell.column}`);
    }

    // Comprueba si una celda ya está ocupada
    public isOccupied(cell: Cell): boolean {
        return this.occupiedCells.has(`${cell.row},${cell.column}`);
    }

    // Libera una celda ocupada
    public clearCell(cell: Cell): void {
        this.occupiedCells.delete(`${cell.row},${cell.column}`);
    }

    // Devuelve el ancho del tablero
    public getWidth(): number {
        return this.width;
    }

    // Devuelve el alto del tablero
    public getHeight(): number {
        return this.height;
    }

    // Devuelve todas las celdas ocupadas
    public getOccupiedCells(): Cell[] {
        return Array.from(this.occupiedCells).map(cell => {
            const [row, column] = cell.split(",").map(Number);
            return { row, column };
        });
    }
        // Comprueba si una fila está completa
    public isRowFull(row: number): boolean {
        for (let column = 0; column < this.width; column++) {
            if (!this.isOccupied({ row, column })) {
                return false;
            }
        }

        return true;
    }

    // Elimina todas las filas completas
    public clearFullRows(): void {
    const newOccupiedCells = new Set<string>();

    for (const cell of this.getOccupiedCells()) {
        if (!this.isRowFull(cell.row)) {
            newOccupiedCells.add(`${cell.row},${cell.column}`);
        }
    }

    let rowsToDrop = 0;

    for (let row = 0; row < this.height; row++) {
        if (this.isRowFull(row)) {
            rowsToDrop++;
        } else if (rowsToDrop > 0) {
            for (let column = 0; column < this.width; column++) {
                if (newOccupiedCells.has(`${row},${column}`)) {
                    newOccupiedCells.delete(`${row},${column}`);
                    newOccupiedCells.add(`${row - rowsToDrop},${column}`);
                }
            }
        }
    }

    this.occupiedCells = newOccupiedCells;
}
}