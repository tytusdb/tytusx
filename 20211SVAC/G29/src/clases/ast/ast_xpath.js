export default class ast_xpath {
    constructor(lista_several) {
        this.lista_several = lista_several;
        this.str_result = "";
    }
    ejecutar(ent, arbol) {
        let entorno_result = new Array();
        let entorno_temp;
        for (let i = 0; i < this.lista_several.length; i++) {
            let slc = this.lista_several[i];
            entorno_temp = ent;
            for (let slc_sub of slc) {
                entorno_temp = slc_sub.getValor(entorno_temp, arbol);
            }
            entorno_result.push(entorno_temp);
        }
        for (let n_ent of entorno_result) {
            for (let slc of n_ent) {
                this.getResult(slc, "");
            }
        }
        return this.str_result;
    }
    getResult(ent, str) {
        if (ent.tabla["n_etiquetas"].valor == 1) {
            this.str_result += str + "<" + ent.tabla["id"].valor;
            this.getParams(ent);
            this.str_result += "/>\n";
        }
        else {
            this.str_result += str + "<" + ent.tabla["id"].valor;
            this.getParams(ent);
            this.str_result += ">\n";
            this.getNodes(ent, str);
            this.getNodeVal(ent, str);
            this.str_result += str + "</" + ent.tabla["id"].valor + ">\n";
        }
    }
    getParams(ent) {
        for (let key in ent.tabla) {
            let atr = ent.tabla[key];
            if (key.startsWith("atr")) {
                this.str_result += ` ${atr.id}="${atr.valor}"`;
            }
        }
    }
    getNodes(ent, str) {
        for (let key in ent.tabla) {
            let hijo = ent.tabla[key];
            if (key.startsWith("hijo")) {
                this.getResult(hijo.valor, str + "\t");
            }
        }
    }
    getNodeVal(ent, str) {
        let val = ent.tabla["valor"];
        if (val != null) {
            this.str_result += str + "\t" + val.valor + "\n";
        }
    }
}
//# sourceMappingURL=ast_xpath.js.map