"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lista_Errores = void 0;
class Lista_Errores{
    constructor(){
        this.l_errores=[];
    }

    limpiar_Arreglo(){
        this.l_errores = [];
    }

    agregar_Error(error){
        this.l_errores.push(error);
    }

    getErrores(){
        var string_ = "";

            if (this.l_errores.length > 0) {
                this.l_errores.forEach(element => {
                    string_ += element.getno_() + ". " + "Fila: " + element.getfila_() + " Columna: " + element.getcolumna_() + " Tipo: " + element.gettipo_() + " Descripcion: " + element.getdescripcion_() + "\n";
                });
            } else {
                string_ = "No se encontraron errores lexicos y/o sintacticos.";
            }         
        return string_;
    }

    

}
exports.Lista_Errores = Lista_Errores;