var nuevo;
var contact = 0;
var res;

export class NodoCST{
    nombre:string;
    indice:number;
    listaNodos:Array<NodoCST>;

    constructor(nombre:string,indice:number,listaNodos:Array<NodoCST>){
        this.nombre=nombre;
        this.indice=indice;
        this.listaNodos=listaNodos;
    }

    crearNodo(Nombre:string,indice:number,lista:Array<NodoCST>){
        nuevo = new NodoCST(Nombre,indice,lista);
        this.listaNodos.push(nuevo);
    }

}

export function crearTextoGraphvizCST(padre:NodoCST,texto:string){
    texto += "nodo" + padre.indice.toString() + "[label=\"" + padre.nombre + "\"];\n";
    if (padre.listaNodos.length > 0) {
        for (const key in padre.listaNodos) {
            texto += "nodo" + padre.listaNodos[key].indice.toString() + "[label=\"" + padre.listaNodos[key].nombre + "\"];\n";
            texto += "nodo" + padre.indice.toString() + "->" + "nodo" + padre.listaNodos[key].indice.toString() + ";\n";
            if (padre.listaNodos[key].listaNodos.length > 0) {
                //console.log(padre.listaNodos[key]);
                texto = crearTextoGraphvizCST(padre.listaNodos[key],texto);
            }
        }
    }
    return texto;
}

export function crearTextoGraphvizRepGram(producciones:Array<string>,reglas:Array<string>,texto:string) {
    texto += "node0[shape=record label=\"{Produccion";
    for (const key in producciones) {
        texto += "|" + producciones[key];
    }
    texto += "}|{Regla Semantica";
    for (const key in reglas) {
        texto += "|" + reglas[key];
    }
    texto += "}\"];";
    return texto;
}