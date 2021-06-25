abstract class Consulta {

    private type: TipoConsulta;
    private id: string;
    private stackPointer: number;

    constructor(type: TipoConsulta, id: string) {
        this.type = type;
        this.id = id;
    }

    public getType(): TipoConsulta {
        return this.type;
    }

    public setType(type: TipoConsulta): void {
        this.type = type;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getStackPointer(): number {
        return this.stackPointer;
    }

    public setStackPointer(stackPointer: number): void {
        this.stackPointer = stackPointer;
    }

    public generateC3D(resultC3D: C3DResult): C3DResult {
        let codigo: Array<string> = resultC3D.getCodigo();
        let i: number = resultC3D.getNextTemp();
        let p: number = resultC3D.getSp();
        this.stackPointer = p;

        codigo.push(`\n\t//C3D consulta tipo  ${this.type}`);
        codigo.push(`\tt${i} = H;`);
        codigo.push(`\tt${i+1} = t${i};`);
        codigo.push(`\tH = H + 2;`);

        //Tipo de consulta
        codigo.push(`\theap[(int)t${i+1} = ${this.type};]`);
        codigo.push(`\tt${i+1} = t${i+1} + 1;`);

        //Id a comparar
        codigo.push(`\tt${i+2} = H;`);
        Array.from(this.id).forEach(s => {
            codigo.push(`\theap[(int)H] = ${s.charCodeAt(0)};`);
            codigo.push(`\tH = H + 1;`);
        });
        codigo.push(`\theap[(int)H] = -1;`);
        codigo.push(`\tH = H + 1;`);
        codigo.push(`\theap[(int)t${i+1}] = t${i+2};`);
        codigo.push(`\tstack[(int)${p++}] = t${i};`);

        resultC3D.setNextTemp(i+3);
        resultC3D.setSp(p);
        resultC3D.setCodigo(codigo);

        return resultC3D;
    }

    public abstract run(entornos: Array<Entorno>):Array<Entorno>;
}