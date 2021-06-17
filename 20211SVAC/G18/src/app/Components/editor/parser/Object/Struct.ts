import { _Type } from '../Types/Type';

export class _Struct {

    constructor(private content: any) { }

    public getContent() {
        return this.content;
    }

    public setContent(content: any[]) {
        this.content = content;
    }

    public getAtribute(id: string) {
        let result;
        for (let i in this.content) {
            if (this.content[i].id == id) return this.content[i];
        }
        return result;
    }

    public hasAtribute(id: string): boolean {
        for (let i in this.content) {
            if (this.content[i].id == id) return true;
        }
        return false;
    }

    public setAtribute(id: string, value: any) {
        // Value tiene que tener id y type: _Type
        for (let i in this.content) {
            if (this.content[i].id == id) return this.content[i] = value;
        }
    }

    public print() {
        let result = "{\n";
        for (let i in this.content) {
            if (this.content[i].value instanceof _Struct) result += this.content[i].value.print() + ";\n";
            else result += "\t" + this.content[i].id + ": " + this.content[i].value + ";\n";
        }
        return result += "}";
    }

}