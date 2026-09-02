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
    public addPiece(cells: Cell[]): boolean {
    const canAddPiece = cells.every(cell =>
        this.isInsideBounds(cell) && !this.isOccupied(cell)
    );

    if (!canAddPiece) {
        return false;
    }

    cells.forEach(cell => this.occupyCell(cell));
    return true;
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
        return Array.from({ length: this.width }, (_, column) => column)
            .every(column => this.isOccupied({ row, column }));
    }

    // Elimina todas las filas completas y baja las de arriba
   public clearFullRows(): number {
    const fullRows = new Set(
        Array.from({ length: this.height }, (_, row) => row)
            .filter(row => this.isRowFull(row))
            
    );

    const newOccupiedCells = new Set<string>();

    this.getOccupiedCells()
        .filter(cell => !fullRows.has(cell.row))
        .forEach(cell => {
            const rowsBelow = Array.from(fullRows)
                .filter(fullRow => fullRow > cell.row).length;

            newOccupiedCells.add(
                `${cell.row + rowsBelow},${cell.column}`
            );
        });

    this.occupiedCells = newOccupiedCells;
    return fullRows.size;

}
}