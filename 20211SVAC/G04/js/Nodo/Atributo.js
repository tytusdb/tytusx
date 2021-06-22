class Atributo extends Simbolo {
    constructor($nombre, $valor, type, $linea, $columna) {
        super($nombre, type, $linea, $columna);
        this.valor = $valor;
    }
    getValor() {
        return this.valor;
    }
    getValorImplicito() {
        return this.valor;
    }
    generateC3D(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let i = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        super.setStackPointer(p);
        codigo.push(`\n\t//C3D atributo ${super.getNombre()} : ${this.valor}`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i + 1} = t${i};`);
        codigo.push(`\tH = H + 2;`);
        codigo.push(`\tt${i + 2} = H;`);
        Array.from(super.getNombre()).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i + 1}] = t${i + 2};`);
        codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
        codigo.push(`\tt${i + 3} = H;`);
        Array.from(this.valor).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i + 1}] = t${i + 3};`);
        codigo.push(`\tstack[(int)${p++}] =  t${i};`);
        resultC3D.setNextTemp(i + 4);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
