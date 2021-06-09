class Atributo {

    private nombre: string;
    private valor: string;
    private linea: number;
    private columna: number;

	constructor($nombre: string, $valor: string, $linea: number, $columna: number) {
		this.nombre = $nombre;
		this.valor = $valor;
		this.linea = $linea;
		this.columna = $columna;
	}

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getValor(): string {
        return this.valor;
    }

    public setValor(valor: string): void {
        this.valor = valor;
    }

    public getLinea(): number {
        return this.linea;
    }

    public setLinea(linea: number): void {
        this.linea = linea;
    }

    public getColumna(): number {
        return this.columna;
    }

    public setColumna(columna: number): void {
        this.columna = columna;
    }

}