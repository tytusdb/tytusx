
export class Atributo {

    id: string;
    value: string;
    line: string;
    column: string;
    private cst?: string;
    constructor(id: string, value: string, line: string, column: string) {
        this.id = id;
        this.value = value;
        this.line = line;
        this.column = column;
    }

    set Cst(value) {
        this.cst = value;
    }
    get Cst() {
        return this.cst;
    }
}