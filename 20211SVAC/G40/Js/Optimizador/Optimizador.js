
class Optimizador{

    constructor(bloques){
        this.bloques = bloques;
    }

    Ejecutar(){

        this.Regla6();
        this.Regla7();
        this.Regla8();
        this.Regla9();
        this.Regla10();
        this.Regla11();
        this.Regla12();
        this.Regla13();
        this.Regla14();
        this.Regla15();
        this.Regla16();
        return this.GenerarResultado();
    }

    // T1 = T1 + 0;
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
                                "Se eliminó la instrucción.",
                                "Regla 6"));
                            bloque.getInstrucciones().splice(i,1);
                            i--;     
                        }
                    }    
                }
            }           
        });
    }  

    // T1 = T1 - 0;
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
                                "Se eliminó la instrucción.",
                                "Regla 7"));
                            bloque.getInstrucciones().splice(i,1);
                            i--;     
                        }
                    }    
                }
            }           
        });
    } 

    // T1 = T1 * 1;
    Regla8(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.MULTIPLICACION) &&
                        (bloque.getInstrucciones()[i].getTemporal() == bloque.getInstrucciones()[i].getOperando1() ||
                         bloque.getInstrucciones()[i].getTemporal() == bloque.getInstrucciones()[i].getOperando2()) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "1" || bloque.getInstrucciones()[i].getOperando2() == "1")){

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                bloque.getInstrucciones()[i].getCodigo3D(),
                                "Se eliminó la instrucción.",
                                "Regla 8"));
                            bloque.getInstrucciones().splice(i,1);
                            i--;     
                        }
                    }    
                }
            }           
        });
    } 

    // T1 = T1 / 1;
    Regla9(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.DIVISION) &&
                        (bloque.getInstrucciones()[i].getTemporal() == bloque.getInstrucciones()[i].getOperando1()) &&
                        (bloque.getInstrucciones()[i].getOperando2() == "1")){

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                bloque.getInstrucciones()[i].getCodigo3D(),
                                "Se eliminó la instrucción.",
                                "Regla 9"));
                            bloque.getInstrucciones().splice(i,1);
                            i--;     
                        }
                    }    
                }
            }           
        });
    } 

    // T1 = T2 + 0;
    Regla10(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.SUMA) &&
                        (bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando1() &&
                         bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando2()) &&
                        (((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string") ||
                         (typeof (bloque.getInstrucciones()[i].getOperando2()) === "string"))) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "0" || bloque.getInstrucciones()[i].getOperando2() == "0")){

                            var codigoAntes = bloque.getInstrucciones()[i].getCodigo3D();
                            var codigoAux = bloque.getInstrucciones()[i].getTemporal();

                            if((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando1() + ";\n";
                            } else if ((typeof (bloque.getInstrucciones()[i].getOperando2()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando2() + ";\n";
                            }

                            bloque.getInstrucciones()[i].setCodigo(codigoAux);

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                codigoAntes,
                                codigoAux,
                                "Regla 10"));
                               
                        }
                    }    
                }
            }           
        });
    }

    // T1 = T2 - 0;
    Regla11(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.RESTA) &&
                        (bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando1() &&
                         bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando2()) &&
                        (((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string") ||
                         (typeof (bloque.getInstrucciones()[i].getOperando2()) === "string"))) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "0" || bloque.getInstrucciones()[i].getOperando2() == "0")){

                            var codigoAntes = bloque.getInstrucciones()[i].getCodigo3D();
                            var codigoAux = bloque.getInstrucciones()[i].getTemporal();

                            if((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando1() + ";\n";
                            } else if ((typeof (bloque.getInstrucciones()[i].getOperando2()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando2() + ";\n";
                            }

                            bloque.getInstrucciones()[i].setCodigo(codigoAux);

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                codigoAntes,
                                codigoAux,
                                "Regla 11"));
                               
                        }
                    }    
                }
            }           
        });
    }

    // T1 = T2 * 1;
    Regla12(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.MULTIPLICACION) &&
                        (bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando1() &&
                            bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando2()) &&
                        (((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string") ||
                            (typeof (bloque.getInstrucciones()[i].getOperando2()) === "string"))) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "1" || bloque.getInstrucciones()[i].getOperando2() == "1")){

                            var codigoAntes = bloque.getInstrucciones()[i].getCodigo3D();
                            var codigoAux = bloque.getInstrucciones()[i].getTemporal();

                            if((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando1() + ";\n";
                            } else if ((typeof (bloque.getInstrucciones()[i].getOperando2()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando2() + ";\n";
                            }

                            bloque.getInstrucciones()[i].setCodigo(codigoAux);

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                codigoAntes,
                                codigoAux,
                                "Regla 12"));
                                
                        }
                    }    
                }
            }           
        });
    }

    // T1 = T2 / 1;
    Regla13(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.DIVISION) &&
                        (bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando1() &&
                         bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando2()) &&
                        (bloque.getInstrucciones()[i].getOperando2() == "1")){

                            var codigoAntes = bloque.getInstrucciones()[i].getCodigo3D();
                            var codigoAux = bloque.getInstrucciones()[i].getTemporal();
                            codigoAux += " = " + bloque.getInstrucciones()[i].getOperando1() + ";\n";
                            
                            bloque.getInstrucciones()[i].setCodigo(codigoAux);

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                codigoAntes,
                                codigoAux,
                                "Regla 13"));
                                
                        }
                    }    
                }
            }           
        });
    }

    // T1 = T2 * 2;
    Regla14(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.MULTIPLICACION) &&
                        (bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando1() &&
                            bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando2()) &&
                        (((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string") ||
                            (typeof (bloque.getInstrucciones()[i].getOperando2()) === "string"))) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "2" || bloque.getInstrucciones()[i].getOperando2() == "2")){

                            var codigoAntes = bloque.getInstrucciones()[i].getCodigo3D();
                            var codigoAux = bloque.getInstrucciones()[i].getTemporal();

                            if((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando1() + " + "
                                 + bloque.getInstrucciones()[i].getOperando1() + ";\n";
                            } else if ((typeof (bloque.getInstrucciones()[i].getOperando2()) === "string")){
                                codigoAux += " = " + bloque.getInstrucciones()[i].getOperando2() + " + "
                                 + bloque.getInstrucciones()[i].getOperando2() + ";\n";
                            }

                            bloque.getInstrucciones()[i].setCodigo(codigoAux);

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                codigoAntes,
                                codigoAux,
                                "Regla 14"));
                                
                        }
                    }    
                }
            }           
        });
    }

    // T1 = T2 * 0;
    Regla15(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.MULTIPLICACION) &&
                        (bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando1() &&
                            bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando2()) &&
                        (((typeof (bloque.getInstrucciones()[i].getOperando1()) === "string") ||
                            (typeof (bloque.getInstrucciones()[i].getOperando2()) === "string"))) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "0" || bloque.getInstrucciones()[i].getOperando2() == "0")){

                            var codigoAntes = bloque.getInstrucciones()[i].getCodigo3D();
                            var codigoAux = bloque.getInstrucciones()[i].getTemporal()+" = 0;\n";


                            bloque.getInstrucciones()[i].setCodigo(codigoAux);

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                codigoAntes,
                                codigoAux,
                                "Regla 15"));
                                
                        }
                    }    
                }
            }           
        });
    }

    // T1 = 0 / T2;
    Regla16(){

        var bloques = this.bloques;

        bloques.forEach(function (bloque){

            if(bloque.getTipo() == TipoBloque.VOID || bloque.getTipo() == TipoBloque.MAIN){

                for (var i=0; i < bloque.getInstrucciones().length;i++ ){

                    if(bloque.getInstrucciones()[i].getTipo() == TipoInstruccion3D.ASIGNACION_OPERACION){

                        if(( bloque.getInstrucciones()[i].getOperador() == Operador.DIVISION) &&
                        (bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando1() &&
                         bloque.getInstrucciones()[i].getTemporal() != bloque.getInstrucciones()[i].getOperando2()) &&
                        (bloque.getInstrucciones()[i].getOperando1() == "0")){

                            var codigoAntes = bloque.getInstrucciones()[i].getCodigo3D();
                            var codigoAux = bloque.getInstrucciones()[i].getTemporal()+" = 0;\n";
                            bloque.getInstrucciones()[i].setCodigo(codigoAux);

                            ListaOptimizaciones.push(new Optimizacion(
                                bloque.getInstrucciones()[i].getLinea(),
                                bloque.getInstrucciones()[i].getColumna(),
                                "Bloques",
                                codigoAntes,
                                codigoAux,
                                "Regla 16"));
                                
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