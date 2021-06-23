class Entorno {
    constructor(anterior) {
        this.tabla = new Array();
        this.anterior = anterior;
    }
    add(simbolo) {
        this.tabla.push(simbolo);
    }
    getTable() {
        return this.tabla;
    }
    setTable(table) {
        this.tabla = table;
    }
    getAnterior() {
        return this.anterior;
    }
    setAnterior(anterior) {
        this.anterior = anterior;
    }
    getStackPointer() {
        return this.stackPointer;
    }
    setStackPointer(stackPointer) {
        this.stackPointer = stackPointer;
    }
    generateC3DXML(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let i = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        this.stackPointer = p;
        codigo.push(`\n\t//C3D entorno`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i + 1} = t${i};`);
        codigo.push(`\tH = H + 2;`);
        codigo.push(`\theap[(int)t${i + 1}] = -1;`);
        codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
        codigo.push(`\tt${i + 2} = H;`);
        codigo.push(`\tt${i + 3} = t${i + 2} + 1;`);
        codigo.push(`\theap[(int)H] = ${this.tabla.length};`);
        codigo.push(`\tH = H + ${this.tabla.length + 1};`);
        let iTemp = i + 3;
        this.tabla.forEach(a => {
            codigo.push(`\n\tt${iTemp + 1} = stack[(int)${a.getStackPointer()}];`);
            codigo.push(`\theap[(int)t${i + 3}] = t${iTemp + 1};`);
            codigo.push(`\tt${i + 3} = t${i + 3} + 1;`);
            iTemp++;
        });
        codigo.push(`\n\theap[(int)t${i + 1}] = t${i + 2};`);
        codigo.push(`\tstack[(int)${p++}] =  t${i};`);
        resultC3D.setNextTemp(iTemp + 1);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
