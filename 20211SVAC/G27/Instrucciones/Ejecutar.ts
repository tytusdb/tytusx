class Ejecutar{
    listaInstrucciones:Array<Elemento>;
    objetoRaiz : Array<Objeto>
    constructor(listaInstrucciones:Array<Elemento>,objetoRaiz : Array<Objeto>){        
        this.listaInstrucciones= listaInstrucciones;
        this.objetoRaiz =objetoRaiz;
    }
    ejecutar(objetoRaiz : Array<Objeto>):Array<Objeto>{
        let resultadoParcial: Array <Objeto> = objetoRaiz;
        this.listaInstrucciones.forEach(  function(value){                                    
            resultadoParcial = value.ejecutarInstrucciones(resultadoParcial,value);            
        });
    return resultadoParcial;

    }
}