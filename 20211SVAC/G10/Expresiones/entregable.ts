class entregable{
    public arbol: Objeto=new Objeto("0","",0,0,[],[]);            
    public lcondi: Array<Atributo>=[];
    public reporte_gramatical:string="";
    public tabla_errores:Tabla_errores=new Tabla_errores();
    public tabla_simbolos:Tabla_simbolos=new Tabla_simbolos();
    //public arbol:{[id:number] : Objeto}={};
    //public lcondi:{[id:number] : Array<Atributo>}={};

    public CrearTabla()
    {     
        this.visitar(this.arbol,0);
    }
    public visitar(nodo:Objeto,padre:number)
    {
        //guardo mi simbolo
        var simbolo = new Simbolo(nodo.identificador,Tipo.OBJETO,nodo.texto,nodo.linea,nodo.columna,padre);
        this.tabla_simbolos.agregar(simbolo);
        var id:number=this.tabla_simbolos.num_registro;

        for (let atri of nodo.listaAtributos){
            var simbolo = new Simbolo(atri.identificador,Tipo.ATRIBUTO,atri.valor,atri.linea,atri.columna,id);
            this.tabla_simbolos.agregar(simbolo);

        }
        for (let obj of nodo.listaObjetos){
            this.visitar(obj,id);
        }
    }

    public GraficarAST(dotData:string){
        //dotData += "0[label=\"Tove\"];" ;

        var padre:number =1;

        dotData += padre+"[label=\""+ this.arbol.identificador  +"\";color=\"red\"];";
        //enviar al primer padre de todo
        dotData += this.recorrerArbolTabla(dotData,this.arbol,padre);
    return dotData
}

    public recorrerArbolTabla(dotData:string,nodo:Objeto,padre:number){

        // en el dotData agregaremos las cadenas
        // en el nodo traemos al nodo padre
        // en el padre traemos el id del padre de sus hijos
        // en el hijo traemos el contador 

        // es padre?
        // si
        if (nodo.listaObjetos!=null){
            //unir padres con hijos
            var hijoactual:number = 2;
            for(let obj of nodo.listaObjetos){
                dotData += padre+""+hijoactual+"[label=\""+ obj.identificador  +"\";color=\"blue\"];";
                dotData += padre+"->"+padre+""+hijoactual+'[arrowhead="none"];';
                hijoactual++;
            }
            //ir al siguiente hijo
            var hijoactual:number = 2;
            for(let obj of nodo.listaObjetos){
                dotData += this.recorrerArbolTabla(dotData,obj,parseInt(padre+""+hijoactual));
                hijoactual++;
            }
            return dotData;
        }else{
            dotData += padre+"[label=\""+ nodo.identificador  +"\";color=\"blue\"];";
            //return dotData;
        }
    }

    public graficarTablaSimbolos(dotTabla:string){
        dotTabla += this.recorrerTablaS(dotTabla,this.arbol,0);
        dotTabla += "</table>>];"
        return dotTabla;
    }

    public recorrerTablaS(dotTabla:string,nodo:Objeto,contador:number){
        var auxsimbolo = new Simbolo(nodo.identificador,Tipo.OBJETO,nodo.texto,nodo.linea,nodo.columna,contador);

        for (let i = 0; i<this.tabla_simbolos.num_registro; i++) {
            auxsimbolo = this.tabla_simbolos.getSimbolo(i);
            if(auxsimbolo!=null && auxsimbolo.getTipo().toString()!='1')
                dotTabla += "<tr><td>"+ i +"</td><td>"+ auxsimbolo.getNombre() +"</td><td>"+ auxsimbolo.getValor()+"</td><td>"+ auxsimbolo.getTipo()+"</td><td>"+ auxsimbolo.getPadre()+"</td><td>"+ auxsimbolo.linea+"</td><td>"+ auxsimbolo.columna+"</td></tr>"
        }

          return dotTabla;
    }

    public reportegramatical(reportegramatical:string){
        reportegramatical = this.reporte_gramatical;
        return reportegramatical;
    }

    public graficarTablaErrores(dotTablaErrores:string){
       
        var auxerror = new ErrorA('aux','aux', 0,0);
        console.log(this.tabla_errores.registros);

        for (let i = 0; i<this.tabla_errores.num_registro; i++) {
            auxerror = this.tabla_errores.getError(i);
            console.log(auxerror);
            if(auxerror!=null){
                dotTablaErrores += "<tr><td>"+ auxerror.tipo +"</td><td>"+ auxerror.descripcion+"</td><td>"+ auxerror.linea+"</td><td>"+ auxerror.columna+"</td></tr>";
            }
        }

        dotTablaErrores += "</table>>];"
        return dotTablaErrores;
    }
}
