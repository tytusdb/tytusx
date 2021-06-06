function Simbolo(identificador:string, valor:any, tipo:Tipo, entorno:string){
	return{
		identificador: identificador,
        valor:valor,
        tipo:tipo,
        entorno:entorno
	}
}

class TablaSimbolos
{
    //Clase tabla simbolos
    private padre:TablaSimbolos;
    public simbolos:any;
    entorno:string;

    constructor(tabla:any, padre:TablaSimbolos, entorno:string){
        this.simbolos = tabla;
        this.padre = padre;
        this.entorno = entorno;
    }

    setEntorno(entorno:string){
        this.entorno = entorno;
    }

    setValor(valor:any){
        this.simbolos.valor=valor;
    }
    agregar( simbolo:NodoTablaSimbolo){
        
        simbolo.indentificador = simbolo.indentificador.toLowerCase();
        this.simbolos.push(simbolo);
        
    }

    setSimbolo(identificador:string, valor:any, tipo:Tipo, alcance:string){
		const NuevoSimbolo = Simbolo(identificador, valor, tipo, alcance);
		this.simbolos.push(NuevoSimbolo);
    }
    
    getSimbolo(identificador:string){
		const simbolo = this.simbolos.filter(simbolo => simbolo.identificador === identificador)[0];
		if(simbolo) return simbolo;
		else return "ERROR"; 
	}

    getAlcance():string{        
		return this.entorno; 
	}
    


    
}