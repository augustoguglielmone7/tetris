    export interface IRotator {
        rotateLeft(): void;
        rotateRight(): void;
        
    }
    
// Define una celda del tablero indicando su fila y columna.
export type Cell = {
    row: number;
    column: number;
};