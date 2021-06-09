class Nodo {

    private nombre: string;
    private atributos: Array<Atributo>;
    private nodos: Array<Nodo>;
    private type: Type;
    private texto: string;
    private columna: number;
    private linea: number;

	constructor($nombre: string, $atributos: Array<Atributo>, $nodos: Array<Nodo>, type: Type, $texto: string, $linea: number, $columna: number) {
		this.nombre = $nombre;
		this.atributos = $atributos;
		this.nodos = $nodos;
        this.type = type;
		this.texto = $texto;
		this.linea = $linea;
		this.columna = $columna;
	}

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getAtributos(): Array<Atributo> {
        return this.atributos;
    }

    public setAtributos(atributos: Array<Atributo>): void {
        this.atributos = atributos;
    }

    public getNodos(): Array<Nodo> {
        return this.nodos;
    }

    public setNodos(nodos: Array<Nodo>): void {
        this.nodos = nodos;
    }

    public getType(): Type {
        return this.type;
    }

    public setType(type: Type): void {
        this.type = type;
    }

    public getTexto(): string {
        return this.texto;
    }

    public setTexto(texto: string): void {
        this.texto = texto;
    }

    public getColumna(): number {
        return this.columna;
    }

    public setColumna(columna: number): void {
        this.columna = columna;
    }

    public getLinea(): number {
        return this.linea;
    }

    public setLinea(linea: number): void {
        this.linea = linea;
    }
}