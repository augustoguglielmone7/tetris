export class Board {
    // Define el ancho y alto del tablero
    public readonly width: number;
    public readonly height: number;

    // Por defecto el tablero tiene 10 columnas y 20 filas
    constructor(width: number = 10, height: number = 20) {
        this.width = width;
        this.height = height;
    }
}