
class Optimizador{

    constructor(bloques){
        this.bloques = bloques;
    }

    Ejecutar(){

        this.Regla6();
        this.Regla7();
        return this.GenerarResultado();

    }

    Regla6(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.SUMA) &&
                        (bloque.getInstrucciones()[i].getTemporal() == bloque.getInstrucciones()[i].getOperando1() ||
                         bloque.getInstrucciones()[i].getTemporal() == bloque.getInstrucciones()[i].getOperando2()) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "0" || bloque.getInstrucciones()[i].getOperando2() == "0")){

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                bloque.getInstrucciones()[i].getCodigo3D(),
                                "Se eliminó el código",
                                "Regla 6"));
                            bloque.getInstrucciones().splice(i,1);
                            i--;     
                        }
                    }    
                }
            }           
        });
    }    

    Regla7(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.RESTA) &&
                        (bloque.getInstrucciones()[i].getTemporal() == bloque.getInstrucciones()[i].getOperando1() ||
                         bloque.getInstrucciones()[i].getTemporal() == bloque.getInstrucciones()[i].getOperando2()) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "0" || bloque.getInstrucciones()[i].getOperando2() == "0")){

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                bloque.getInstrucciones()[i].getCodigo3D(),
                                "Se eliminó el código",
                                "Regla 7"));
                            bloque.getInstrucciones().splice(i,1);
                            i--;     
                        }
                    }    
                }
            }           
        });
    } 

    GenerarResultado(){

        var bloques = this.bloques;
        var resultadoAux = 
`/* RESULTADO OPTIMIZADO (Desarrollado por Oscar Llamas :D) */
/*------HEADER------*/
        
`;
        
        bloques.forEach(function (bloque){
            resultadoAux += bloque.getCodigo3D();
        });

        return resultadoAux;

    }

}