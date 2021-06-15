class Errores {
    errores1:Array<Erro> = new Array();
    public agregarError(tipo:string,descripcion:string,linea:number,columna:number):void{
        this.errores1.push(new Erro(tipo,descripcion,linea,columna));
    }
    
    public agregarError1(errorEntrada:Erro){
        this.errores1.push(errorEntrada);
    }

    getErrores():Array<Erro> {
        return this.errores1;
    }

    getError(index: number): Erro {
        return this.errores1[index];
    }

    get getSize():number{
        return this.errores1.length;
    }
}

function agregarErrorLexico(tipo:string,contenido:string,linea:number,columna:number):void{    
    if(errores.getSize>0){
        let posErrorAnterior = errores.getSize - 1;
        let errorAnterior = errores.getError(posErrorAnterior);
        if(errorAnterior.getTipo.toUpperCase()=="LEXICO"){            
            if(errorAnterior.getLinea==linea && (columna-errorAnterior.getColumna==1)){
                let texto = errorAnterior.getLexema + contenido;
                let descripcionSalida = "Palabra no valida: "+texto;
                errorAnterior.setDescripcion(descripcionSalida);
                errorAnterior.setLexema(texto);
                errorAnterior.setColumna(columna);
            }
        } else {
            let error: Erro = new Erro("Lexico", "Caracter invalido: " + contenido, linea, columna);
            error.setLexema(contenido);
            errores.agregarError1(error);
        }
    } else {
        let error: Erro = new Erro("Lexico", "Caracter invalido: " + contenido, linea, columna);
        error.setLexema(contenido);
        errores.agregarError1(error);
    }
}