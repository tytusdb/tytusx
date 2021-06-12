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
        let etiqueta: Array<string> = new Array();

        etiqueta.push("<" + super.getNombre() + this.attribsToText() + ">");
        etiqueta.push(this.texto);
        etiqueta.push(this.nodesToTag(this.entorno));
        etiqueta.push("</" + super.getNombre()+">");

        return etiqueta.join("");
    }

    private attribsToText(): string {
        let attribText: Array<String> = new Array();
        this.atributos.forEach(a => {
            attribText.push(" " + a.getNombre() + "=\"" + a.getValor() + "\"");
        });
        return attribText.join("");
    }

    private nodesToTag(entorno: Entorno): string {
        let nodosText: Array<string> = new Array();

        entorno.getTable().forEach(n => {
            if (n instanceof Nodo) {
                nodosText.push("\n" +n.toTag());
            }
        });

        return nodosText.join("");
    }
}