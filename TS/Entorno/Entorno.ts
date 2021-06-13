class Entorno {

    private anterior: Entorno;
    private tabla: Array<Simbolo>;

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
}