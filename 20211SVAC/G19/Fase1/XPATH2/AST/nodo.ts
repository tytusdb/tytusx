
 class nodo {
    name:string="";
    value:string="";   
    children:Array<nodo>;
    contenido="";
    constructor(name:string,children:Array<nodo>, value:string){
        this.name = name;
        this.children=children;
        this.value=value
    };
}