class Nodo extends Simbolo {
    constructor(...args) {
        if (args.length === 7) {
            super(args[0], args[3], args[5], args[6]);
            this.atributos = args[1];
            this.nodos = args[2];
            this.texto = args[4];
            this.showTextOnly = false;
            return;
        }
        if (args.length === 2) {
            super(null, null, null, null);
            this.texto = args[0];
            this.entorno = args[1];
            this.showTextOnly = true;
            return;
        }
    }
    getAtributos() {
        return this.atributos;
    }
    setAtributos(atributos) {
        this.atributos = atributos;
    }
    getNodos() {
        return this.nodos;
    }
    setNodos(nodos) {
        this.nodos = nodos;
    }
    getTexto() {
        return this.texto;
    }
    setTexto(texto) {
        this.texto = texto;
    }
    getValorImplicito() {
        return this.texto;
    }
    getEntorno() {
        return this.entorno;
    }
    setEntorno(entorno) {
        this.entorno = entorno;
    }
    setShowTextOnly(flag) {
        this.showTextOnly = flag;
    }
    justShowTextOnly() {
        return this.showTextOnly;
    }
    toText() {
        return this.texto;
    }
    toTag() {
        let etiqueta = new Array();
        if (super.getType() === Type.DOUBLE_TAG) {
            etiqueta.push("<" + super.getNombre() + this.attribsToText() + ">");
            etiqueta.push(this.texto);
            etiqueta.push(this.nodesToTag(this.entorno));
            etiqueta.push("</" + super.getNombre() + ">");
        }
        else {
            etiqueta.push("<" + super.getNombre() + this.attribsToText() + "/>");
        }
        return etiqueta.join("");
    }
    attribsToText() {
        let attribText = new Array();
        this.atributos.forEach(a => {
            attribText.push(" " + a.getNombre() + "=\"" + a.getValor() + "\"");
        });
        return attribText.join("");
    }
    nodesToTag(entorno) {
        let nodosText = new Array();
        entorno.getTable().forEach(n => {
            if (n instanceof Nodo) {
                nodosText.push("\n" + n.toTag());
            }
        });
        return nodosText.join("");
    }
    generateC3D(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let i = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        super.setStackPointer(p);
        codigo.push(`\n\t//C3D nodo ${super.getNombre()}`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i + 1} = t${i};`);
        codigo.push(`\tH = H + 4;`);
        //Nombre
        codigo.push(`\tt${i + 2} = H;`);
        Array.from(super.getNombre()).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i + 1}] = t${i + 2};`);
        codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
        //Texto
        codigo.push(`\tt${i + 3} = H;`);
        Array.from(this.texto).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i + 1}] = t${i + 3};`);
        codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
        //Atributos
        codigo.push(`\tt${i + 4} = H;`);
        codigo.push(`\tt${i + 5} = t${i + 4} + 1;`);
        codigo.push(`\theap[(int)H] = ${this.atributos.length};`);
        codigo.push(`\tH = H + ${this.atributos.length + 1};`);
        let iTemp = i + 5;
        this.atributos.forEach(a => {
            codigo.push(`\n\tt${iTemp + 1} = stack[(int)${a.getStackPointer()}];`);
            codigo.push(`\theap[(int)t${i + 5}] = t${iTemp + 1};`);
            codigo.push(`\tt${i + 5} = t${i + 5} + 1;`);
            iTemp++;
        });
        iTemp++;
        codigo.push(`\n\theap[(int)t${i + 1}] = t${i + 4};`);
        codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
        //Entorno
        codigo.push(`\n\tt${iTemp} = stack[(int)${this.entorno.getStackPointer()}];`);
        codigo.push(`\theap[(int)t${i + 1}] = t${iTemp++};`);
        codigo.push(`\tstack[(int)${p++}] = t${i};`);
        resultC3D.setNextTemp(iTemp);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
    setEntornoToChilds(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let i = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        //let iTemp: number = i;
        if (this.nodos.length > 0) {
            codigo.push(`\n\t//Agregando entorno a childs`);
        }
        ;
        this.nodos.forEach(n => {
            if (n.getType() == Type.DOUBLE_TAG) {
                /*codigo.push(`\tt${i} = stack[(int)${n.getStackPointer()}];`); //Accedo al nodo
                codigo.push(`\tt${i} = t${i} + 3;`); //Accedo al entorno del nodo*/
                codigo.push(`\tt${i} = stack[(int)${n.getEntorno().getStackPointer()}];`); //Referencia del entorno del child
                codigo.push(`\tt${i} = t${i} + 0;`); //Accedo al anterior del entorno
                codigo.push(`\tt${i + 1} = stack[(int)${this.entorno.getStackPointer()}];`);
                codigo.push(`\theap[(int)t${i}] = t${i + 1};`);
                i += 2;
            }
        });
        resultC3D.setNextTemp(i);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
