class C3DResult {

    private codigo: Array<string>;
    private sp: number;
    private nextTemp: number;
    private entornos: Array<Entorno>;

    constructor(codigo: Array<string>, sp: number, nextTemp: number, entornos: Array<Entorno>) {
        this.codigo = codigo;
        this.sp = sp;
        this.nextTemp = nextTemp;
        this.entornos = entornos;
    }

    public getCodigo(): Array<string> {
        return this.codigo;
    }

    public setCodigo(codigo: Array<string>): void {
        this.codigo = codigo;
    }

    public getSp(): number {
        return this.sp;
    }

    public setSp(sp: number): void {
        this.sp = sp;
    }

    public getNextTemp(): number {
        return this.nextTemp;
    }

    public setNextTemp(nextTemp: number): void {
        this.nextTemp = nextTemp;
    }

    public getEntornos(): Array<Entorno> {
        return this.entornos;
    }

    public setEntornos(entornos: Array<Entorno>): void {
        this.entornos = entornos;
    }
}