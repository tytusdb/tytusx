import { stringify } from "querystring";

class Graficar{
    contador:number;

    constructor(){
        this.contador = 0;
    }


    graficarXML() : string{
        const NUMID = this.incrementarContador();
        const encabezado:string =  `digraph AST 
        {
        rankdir=TB; 
        node[shape = box, style = filled, color = white];
        node${NUMID}[label="AST"];
        `;    

        let str = [];
        str.push(encabezado);

        let numaux = 0;
        
        for(let aux of listaObjetos)
        {
            numaux = aux.graph(this,str, this.contador);
            str.push(`
            node${NUMID} -> node${numaux};
            `);
        }

        str.push("\n}\n");
        return str.join("");
    }

    incrementarContador():number{
        return this.contador ++;
    }
    
    
}