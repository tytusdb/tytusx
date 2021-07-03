class Consulta {
    constructor(type, id, filtros) {
        this.type = type;
        this.id = id;
        this.filtros = filtros;
        this.hasPredicado = (this.filtros.length > 0) ? true : false;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getStackPointer() {
        return this.stackPointer;
    }
    setStackPointer(stackPointer) {
        this.stackPointer = stackPointer;
    }
    getFiltros() {
        return this.filtros;
    }
    setFiltros(filtros) {
        this.filtros = filtros;
    }
    getHasPredicado() {
        return this.hasPredicado;
    }
    setHasPredicado(hasPredicado) {
        this.hasPredicado = hasPredicado;
    }
    generateC3D(resultC3D) {
        let codigo = resultC3D.getCodigo();
        let i = resultC3D.getNextTemp();
        let p = resultC3D.getSp();
        this.stackPointer = p;
        codigo.push(`\n\t//C3D consulta tipo  ${this.type}`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i + 1} = t${i};`);
        codigo.push(`\tH = H + 2;`);
        //Tipo de consulta
        codigo.push(`\theap[(int)t${i + 1}] = ${this.type};`);
        codigo.push(`\tt${i + 1} = t${i + 1} + 1;`);
        //Id a comparar
        codigo.push(`\tt${i + 2} = H;`);
        Array.from(this.id).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i + 1}] = t${i + 2};`);
        codigo.push(`\tstack[(int)${p++}] = t${i};`);
        resultC3D.setNextTemp(i + 3);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);
        return resultC3D;
    }
}
