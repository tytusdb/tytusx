
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
        node${NUMID}[label="CST XML"];
        `;    

        let str = [];
        str.push(encabezado);

        let numaux = 0;
        let g = new Graficar();
        g.incrementarContador();
        for(let aux of listaObjetos)
        {
            numaux = aux.graph(aux,str, g);
            str.push(`
            node${NUMID} -> node${numaux};
            `);
        }

        str.push("\n}\n");
        return str.join("");
    }


    graficarXPATHAST() : string{
        const NUMID = this.incrementarContador();
        const encabezado:string =  `digraph AST 
        {
        rankdir=TB; 
        node[shape = box, style = filled, color = white];
        node${NUMID}[label="AST XPATH"];
        `;    

        let str = [];
        str.push(encabezado);

        let numaux = 0;
        let g = new Graficar();
        g.incrementarContador();
        
        for(let aux of listaDirecciones)
        {
            numaux = graphXPathRuta(str, aux, g);
            str.push(`
            node${NUMID} -> node${numaux};
            `);
        }
        str.push("\n}\n");
        return str.join("");
    }

    graficarXPATHCST() : string{
        const NUMID = this.incrementarContador();
        const encabezado:string =  `digraph AST 
        {
        rankdir=TB; 
        node[shape = box, style = filled, color = white];
        node${NUMID}[label="CST XPATH"];
        `;    

        let str = [];
        str.push(encabezado);

        let numaux = 0;
        let g = new Graficar();
        g.incrementarContador();
        
        for(let aux of listaDirecciones)
        {
            numaux = graphXPathRuta2(str, aux, g);
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
    
    getContador():number{
        return this.contador;
    }


}