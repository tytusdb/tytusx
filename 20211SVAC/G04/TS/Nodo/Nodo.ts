class Nodo extends Simbolo {

    private atributos: Array<Atributo>;
    private nodos: Array<Nodo>;
    private entorno: Entorno;
    private texto: string;
    private showTextOnly: boolean;

    public constructor(text: string, entorno: Entorno);

	public constructor($nombre: string, $atributos: Array<Atributo>, $nodos: Array<Nodo>, type: Type, $texto: string, $linea: number, $columna: number);

    public constructor(...args: Array<any>) {

        if (args.length === 7) {
            super(args[0], args[3], args[5], args[6]);
            this.atributos = args[1];
            this.nodos = args[2];
            this.texto = args[4];
            this.showTextOnly = false;
            return;
        }
        if (args.length === 2) {
            super(null,null,null,null);
            this.texto = args[0];
            this.entorno = args[1];
            this.showTextOnly = true;
            return;
        }

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

    public setShowTextOnly(flag: boolean): void {
        this.showTextOnly = flag;
    }

    public justShowTextOnly(): boolean {
        return this.showTextOnly;
    }

    public toText(): string {
        return this.texto;
    }

    public toTag(): string {
        let etiqueta: Array<string> = new Array();
        if (super.getType() === Type.DOUBLE_TAG) {
            etiqueta.push("<" + super.getNombre() + this.attribsToText() + ">");
            etiqueta.push(this.texto);
            etiqueta.push(this.nodesToTag(this.entorno));
            etiqueta.push("</" + super.getNombre()+">");
        } else {
            etiqueta.push("<" + super.getNombre() + this.attribsToText() + "/>");
        }
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