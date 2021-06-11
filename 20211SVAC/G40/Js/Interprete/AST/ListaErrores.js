class ListaErrores{
    constructor(){
        this.errores=[];
    }

    limpiarArreglo(){
        this.errores = [];
    }

    agregarError(error){
        this.errores.push(error);
    }

    ReporteErrores(){


    }

    getErrores(){
        var concatena = "";

            if (this.errores.length > 0) {
                this.errores.forEach(element => {
                    concatena += element.getNo() + ". " + "Fil: " + element.getFila() + " Col: " + element.getColumna() + " Tipo: " + element.getTipo() + " Desc. " + element.getDescripcion() + "\n";
                });
            } else {
                concatena = "No se encontraron errores lexicos ni sintacticos.";
            }         
        return concatena;
    }

    

}