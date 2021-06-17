import { _Type } from '../Types/Type';
import { Retorno } from '../Abstract/Retorno';

export class _Array {

    constructor(public dimensions: number, private content: Array<any>, public tipo: _Type) { }

    public getAtributo(index: string) {
        return this.content[index];
    }

    public setAtributo(index: string, value: any) {
        this.content[index] = value;
    }

    public print() {
        let result = "[ ";
        this.content.forEach(element => {
            if(element instanceof _Array) result += element.print() + ",\n";
            else result += element.value + ", ";
        });
        if(result.length > 2) result = result.substring(0, result.length - 2);
        return result += " ]";
    }

    public pop() {
        return this.content.pop();
    }

    public length() {
        return this.content.length;
    }

    public push(val: any){
        this.content.push(val);
    }


}