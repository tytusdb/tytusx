class Nodo extends Simbolo {

    private atributos: Array<Atributo>;
    private nodos: Array<Nodo>;
    private entorno: Entorno;
    private texto: string;

	constructor($nombre: string, $atributos: Array<Atributo>, $nodos: Array<Nodo>, type: Type, $texto: string, $linea: number, $columna: number) {
        super($nombre, type, $linea, $columna);
		this.atributos = $atributos;
		this.nodos = $nodos;
		this.texto = $texto;
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

    public getTexto(): string {
        return this.texto;
    }

    public setTexto(texto: string): void {
        this.texto = texto;
    }

    public getValorImplicito(): string {
        return this.texto;
    }

    public getEntorno(): Entorno {
        return this.entorno;
    }

    public setEntorno(entorno: Entorno): void {
        this.entorno = entorno;
    }

    public toTag(): string {
        return "<"+super.getNombre()+"></"+super.getNombre()+">";
    }
}