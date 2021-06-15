class Atributo extends Simbolo {

    private valor: string;

	constructor($nombre: string, $valor: string, type: Type, $linea: number, $columna: number) {
		super($nombre, type, $linea, $columna);
		this.valor = $valor;
	}

    public getValor(): string {
        return this.valor;
    }

    public getValorImplicito(): string {
        return this.valor;
    }

}