export class comando{
    id:string;
    linea:number;
    goto:boolean;

    constructor(id, li, go){
        this.id = id;
        this.linea=li;
        this.goto=go;
    }

}