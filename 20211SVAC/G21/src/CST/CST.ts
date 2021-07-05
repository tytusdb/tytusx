export class CST{
    id:string;
    ramas:Array<CST>;

    constructor(id: string, ramas: Array<CST>){
        this.id = id;
        this.ramas = ramas;
    }
}