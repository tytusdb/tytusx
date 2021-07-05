class ValidacionExpresion {
    /*
    Matriz donde ser verifica que tipoDato de resultado arroja la operacion, antes esta es validad, pero 
    aqui tambine se valida, la matriz sique un tipoDato de 
    
                integer     string      decimal       boolean
    integer                                                     
    string                                                      
    decimal                                                     
    boolean                                                     
    */

    static aritmeticos: TiposDatos[][] = [
        [TiposDatos.ENTERO, null, TiposDatos.DECIMAL, null],
        [null, null, null, null],
        [TiposDatos.DECIMAL, null, TiposDatos.DECIMAL, null],
        [null, null, null, null]
    ];

    static relacionales: TiposDatos[][] = [
        [TiposDatos.BOOLEAN, null, TiposDatos.BOOLEAN, null],
        [null, TiposDatos.BOOLEAN, null, null],
        [TiposDatos.BOOLEAN, null, TiposDatos.BOOLEAN, null],
        [null, null, null, TiposDatos.BOOLEAN]
    ];

    static logicos: TiposDatos[][] = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, TiposDatos.BOOLEAN]
    ];

    static validacion(I: Expresion, tipoOperacion: tiposOperando, D: Expresion): Expresion {
        let resultadoOperacion: TiposDatos;
        let tipoOperacionString: Array<string> = ["+", "-", "*", "/", "%", "==", ">", ">=", "<", "<=", "!=", "&&", "||", "!"];
        if (I.tipoDato != null && D.tipoDato != null) {
            if (tipoOperacion <= 5) {
                resultadoOperacion = this.aritmeticos[I.tipoDato][D.tipoDato];
            } else if (tipoOperacion <= 11) {
                resultadoOperacion = this.relacionales[I.tipoDato][D.tipoDato];
            } else {
                resultadoOperacion = this.logicos[I.tipoDato][D.tipoDato];
            }
            if (resultadoOperacion == null) {
                console.log("se agrega error de operacion: " + I.valor + " " + tipoOperacionString[tipoOperacion - 1] + " " + D.valor);
            }
        }
        let valor = I.valor + tipoOperacionString[tipoOperacion - 1] + D.valor;
        return new Expresion(resultadoOperacion, valor);
    }
    static validarVariable(variables: Array<Variable>, idVariable: string, ambito: string, tipoNativa: object): Expresion {
        let variable = variables.find(e => e.id == idVariable && e.ambito == ambito);
        let retorno = new Expresion(null, null);
        if (variable != undefined) {
            retorno = new Expresion(variable.tipoVariable(), idVariable);
            let aux;
            //@ts-ignore
            if (tipoNativa != null) {
                //@ts-ignore
                aux = retorno = this.validarNativa(tipoNativa,retorno,false);
                if(aux.valor!=null){
                    retorno = aux;
                }
            }
            
        } else {
            console.log("Error no existe la variable a usar: " + idVariable);
        }
        return retorno;
    }
    static validaarFuncion(funciones: Array<CrearFuncion>, idFuncion: string, parametros: Array<Expresion>): Expresion {
        let funcion = funciones.find(e => e.id == idFuncion);
        let arrayParametros = Array<string>();
        let retorno = new Expresion(null, null);
        if (funcion != undefined) {
            if (funcion.tipo != null) {
                if (funcion.listadoParametros.length == parametros.length) {
                    for (let i = 0; i < funcion.listadoParametros.length; i++) {
                        let e = funcion.listadoParametros[i];
                        if (e.tipoDato == TiposDatos.DECIMAL && (parametros[i].tipoDato == TiposDatos.DECIMAL || parametros[i].tipoDato == TiposDatos.ENTERO)) {
                            arrayParametros.push(parametros[i].valor);
                        } else if (e.tipoDato == parametros[i].tipoDato) {
                            arrayParametros.push(parametros[i].valor);
                        } else {
                            console.log("Error de tipo", e.tipoDato, parametros[i].tipoDato);
                            return retorno;
                        }
                    }
                } else {
                    console.log("Error desde validacionExpresion.validarFuncion parametros demas");
                    return retorno;
                }
            } else {
                console.log("Error desde validacionExpresion.validarFuncion no tiene tipo la funcion");
                return retorno;
            }
        } else {
            console.log("Error desde validacionExpresion.validarFuncion no existe la funcion " + idFuncion);
            return retorno;
        }
        let valor = idFuncion + "(" + arrayParametros.join(",") + ")"
        return new Expresion((funcion as CrearFuncion).tipoRetorno, valor);
    }

    static umenos(I: Expresion): Expresion {
        let retorno = new Expresion(null, null);
        if (I.tipoDato == TiposDatos.ENTERO || I.tipoDato == TiposDatos.DECIMAL) {
            retorno = new Expresion(I.tipoDato, "-" + I.valor);
        }
        return retorno;
    }

    static negado(I: Expresion): Expresion {
        let retorno = new Expresion(null, null);
        if (I.tipoDato == TiposDatos.BOOLEAN) {
            retorno = new Expresion(I.tipoDato, "!" + I.valor);
        }
        return retorno;
    }

    static validarNativa(tipoNativa: object,expresion:Expresion,is_:boolean):Expresion {
        let retorno;
        console.log(tipoNativa,expresion,is_);
        if(is_)retorno = expresion;else retorno = new Expresion(null,null);
        if(tipoNativa!=null){
            //@ts-ignore
            switch (tipoNativa.tipo) {
                case 1:
                    if(expresion.tipoDato==1)retorno = new Expresion(TiposDatos.STRING,expresion.valor+".toUpperCase() ");
                    break;
                case 2:
                    if(expresion.tipoDato==1)retorno = new Expresion(TiposDatos.STRING,expresion.valor+".toLowerCase() ");
                    break;
                case 3:
                    retorno = new Expresion(TiposDatos.STRING,expresion.valor+".toString() ");
                    break;
                case 4:
                    retorno = new Expresion(TiposDatos.ENTERO,"parseInt("+expresion.valor+")");
                    break;
                case 5:
                    //@ts-ignore
                    if(expresion.tipoDato==1)retorno = new Expresion(TiposDatos.STRING,expresion.valor+".substring("+tipoNativa.posx+","+tipoNativa.posy+") ");
                    break;
            }
            if(retorno.tipoDato == null){
                console.log("Error en operacion de funcion nativa");
            }
        }
        console.log("entrada ",expresion," saida ",retorno)
        return retorno;
    }

}