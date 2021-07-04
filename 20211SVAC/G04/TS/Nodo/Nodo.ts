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

    public generateC3D(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let i: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();
        super.setStackPointer(p);

        codigo.push(`\n\t//C3D nodo ${super.getNombre()}`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i+1} = t${i};`);
        codigo.push(`\tH = H + 5;`);

        //Nombre
        codigo.push(`\tt${i+2} = H;`);
        Array.from(super.getNombre()).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i+1}] = t${i+2};`);
        codigo.push(`\tt${i+1} = t${i+1} + 1;`);

        //Texto
        codigo.push(`\tt${i+3} = H;`);
        Array.from(this.texto).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i+1}] = t${i+3};`);
        codigo.push(`\tt${i+1} = t${i+1} + 1;`);

        //Tipo simbolo
        codigo.push(`\theap[(int)t${i+1}] = ${super.getType()};`);
        codigo.push(`\tt${i+1} = t${i+1} + 1;`);

        //Atributos
        codigo.push(`\tt${i+4} = H;`);
        codigo.push(`\tt${i+5} = t${i+4} + 1;`);
        codigo.push(`\theap[(int)H] = ${this.atributos.length};`);
        codigo.push(`\tH = H + ${this.atributos.length + 1};`);

        let iTemp: number = i+5;

        this.atributos.forEach(a => {
            codigo.push(`\n\tt${iTemp+1} = stack[(int)${a.getStackPointer()}];`);
            codigo.push(`\theap[(int)t${i+5}] = t${iTemp+1};`);
            codigo.push(`\tt${i+5} = t${i+5} + 1;`);
            iTemp++;
        });
        iTemp++;
        codigo.push(`\n\theap[(int)t${i+1}] = t${i+4};`);
        codigo.push(`\tt${i+1} = t${i+1} + 1;`);

        //Entorno
        codigo.push(`\n\tt${iTemp} = stack[(int)${this.entorno.getStackPointer()}];`);
        codigo.push(`\theap[(int)t${i+1}] = t${iTemp++};`);

        codigo.push(`\tstack[(int)${p++}] = t${i};`);

        resultC3D.setNextTemp(iTemp);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }

    public setEntornoToChilds(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let i: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();

        //let iTemp: number = i;
        if (this.nodos.length > 0 ) {codigo.push(`\n\t//Agregando entorno a childs`)};
        this.nodos.forEach(n => {
            if (n.getType() == Type.DOUBLE_TAG) {
                /*codigo.push(`\tt${i} = stack[(int)${n.getStackPointer()}];`); //Accedo al nodo
                codigo.push(`\tt${i} = t${i} + 3;`); //Accedo al entorno del nodo*/
                codigo.push(`\tt${i} = stack[(int)${n.getEntorno().getStackPointer()}];`);   //Referencia del entorno del child
                codigo.push(`\tt${i} = t${i} + 0;`);    //Accedo al anterior del entorno
                codigo.push(`\tt${i+1} = stack[(int)${this.entorno.getStackPointer()}];`);
                codigo.push(`\theap[(int)t${i}] = t${i+1};`);
                i+=2;
            }
        });

        resultC3D.setNextTemp(i);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }
}