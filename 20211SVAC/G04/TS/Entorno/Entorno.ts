class Entorno {

    private anterior: Entorno;
    private tabla: Array<Simbolo>;
    private stackPointer: number;

    constructor(anterior: Entorno) {
        this.tabla = new Array();
        this.anterior = anterior;
    }

    public add(simbolo: Simbolo): void {
        this.tabla.push(simbolo);
    }

    public getTable(): Array<Simbolo> {
        return this.tabla;
    }

    public setTable(table: Array<Simbolo>): void {
        this.tabla = table;
    }

    public getAnterior(): Entorno {
        return this.anterior;
    }

    public setAnterior(anterior: Entorno): void {
        this.anterior = anterior;
    }

    public getStackPointer(): number {
        return this.stackPointer;
    }

    public setStackPointer(stackPointer: number): void {
        this.stackPointer = stackPointer;
    }

    public generateC3DXML(resultC3D: C3DResult): C3DResult{
        let codigo: Array<string> = resultC3D.getCodigo();
        let i: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();
        this.stackPointer = p;

        codigo.push(`\n\t//C3D entorno`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i+1} = t${i};`);
        codigo.push(`\tH = H + 2;`);
        codigo.push(`\theap[(int)t${i+1}] = -1;`);
        codigo.push(`\tt${i+1} = t${i+1} + 1;`);
        codigo.push(`\tt${i+2} = H;`);
        codigo.push(`\tt${i+3} = t${i+2} + 1;`);
        codigo.push(`\theap[(int)H] = ${this.tabla.length};`);
        codigo.push(`\tH = H + ${this.tabla.length + 1};`);

        let iTemp: number = i+3;

        this.tabla.forEach(a => {
            codigo.push(`\n\tt${iTemp+1} = stack[(int)${a.getStackPointer()}];`);
            codigo.push(`\theap[(int)t${i+3}] = t${iTemp+1};`);
            codigo.push(`\tt${i+3} = t${i+3} + 1;`);
            iTemp++;
        });

        codigo.push(`\n\theap[(int)t${i+1}] = t${i+2};`);
        codigo.push(`\tstack[(int)${p++}] =  t${i};`);

        resultC3D.setNextTemp(iTemp+1);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }
}