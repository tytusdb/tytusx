"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;

class Error{
    constructor(no_, fila_, columna_, tipo_, descripcion_){
        this.no_ = no_;
        this.fila_ = fila_;
        this.columna_ = columna_;
        this.tipo_ = tipo_;
        this.descripcion_ = descripcion_;
    }
    getno_(){
       return this.no_;
    }

    getfila_(){
        return this.fila_;
     }

     getcolumna_(){
        return this.columna_;
     }

     gettipo_(){
        return this.tipo_;
     }

     getdescripcion_(){
        return this.descripcion_;
     }

    
}
exports.Error = Error;