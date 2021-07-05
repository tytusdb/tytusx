import { Declaracion3D } from "./Estructuras/C3D/Declaracion3D";
import { Asignacion, Etiqueta, Instruccion3D } from "./Estructuras/C3D/Instruccion3D";
import { Simbolo } from "./Estructuras/C3D/Operacion3D";
import { TipoInstruccion, TipoOperador, TipoParametro } from "./Estructuras/tipificacion";

export interface Optimizacion{
    Regla:number;
    AccionRealizada:String;
    Fila:number;
    Columna:number;
}


export class OptimizarCodigo{
    Reporte:Optimizacion[] = [];
    optimizacion3 = true;
    Optimizar(codigo:Declaracion3D[]):Declaracion3D[]{
        codigo.forEach(element => {
            if(element.Instruccion3D.length>0){
                element.Instruccion3D =  this.Regla2(element.Instruccion3D);
                while(this.optimizacion3){
                     element.Instruccion3D =  this.Regla3(element.Instruccion3D);
                }
                element.Instruccion3D =  this.Regla6(element.Instruccion3D);
                element.Instruccion3D =  this.Regla7(element.Instruccion3D);
                element.Instruccion3D =  this.Regla8(element.Instruccion3D);
                element.Instruccion3D =  this.Regla16(element.Instruccion3D);
                element.Instruccion3D =  this.Regla1(element.Instruccion3D);
            }
        });
       return codigo;
    }

    Regla1(codigo:Instruccion3D[]):Instruccion3D[] {
        var ret:Instruccion3D[] = [];
        for(var i = 0; i < codigo.length ; i++){
            if(codigo[i].TipoInstruccion == TipoInstruccion.Asignacion){
                var asignacion = codigo[i].Dato as Asignacion;
                var simbolo = (asignacion.Operacion as any) as Simbolo;
                if(simbolo.constructor.name == 'Simbolo'){
                    if(codigo[i+1].TipoInstruccion == TipoInstruccion.Asignacion){
                        var asignacionSiguiente = codigo[i+1].Dato as Asignacion;
                        var simboloSiguiente = (asignacionSiguiente.Operacion as any) as Simbolo;
                        if(simboloSiguiente.constructor.name == 'Simbolo'){
                            if(asignacion.ID == simboloSiguiente.Valor.toString() && simbolo.Valor.toString() == asignacionSiguiente.ID){
                                ret.push(codigo[i]);
                                this.Reporte.push({Regla:1, AccionRealizada:'Eliminando expresión: ' + asignacionSiguiente.C3D, Columna: asignacionSiguiente.Columna, Fila:asignacionSiguiente.Fila });
                                for(var j = i+2 ; j<codigo.length; j++){
                                    ret.push(codigo[j]);
                                }
                                return ret;
                            }else{
                                ret.push(codigo[i]);
                            }
                        }else{
                            ret.push(codigo[i]);
                        }
                    }else{
                        ret.push(codigo[i]);
                    }
                }else{
                    ret.push(codigo[i]);
                }
            }else{
                ret.push(codigo[i]);
            }
        }
        return ret;
    }
    Regla2(codigo:Instruccion3D[]):Instruccion3D[] {
        var ret:Instruccion3D[] = [];
        var SentenciasPorEliminar:Instruccion3D[] = [];
        var onGoto = false;
        var idActual = '';
        var cont = 0;
        codigo.forEach(element => {
            var segundaCondicion = true;
            if(cont-1 > 0){
                segundaCondicion = codigo[cont-1].TipoInstruccion == TipoInstruccion.If ;
            }
            if(element.TipoInstruccion == TipoInstruccion.GoTo && segundaCondicion){
                ret.push(element);
                onGoto = true;
                idActual = (element.Dato as Etiqueta).ID;
            }else{
                if(onGoto){
                    if(element.TipoInstruccion == TipoInstruccion.Etiqueta){
                        onGoto = false;
                        idActual = '';
                        ret.push(element);
                        // if( (element.Dato as Etiqueta).ID == idActual){
                        //     onGoto = false;
                        //     idActual = '';
                        //     ret.push(element);
                        // }else{
                        //     SentenciasPorEliminar.push(element);
                        // }
                    }else{
                        SentenciasPorEliminar.push(element);
                    }
                }else{
                    ret.push(element);
                }
            }
            cont++;
        });
        SentenciasPorEliminar.forEach(element => {
            var data = element.Dato as any;
            this.Reporte.push({Regla:2, AccionRealizada:'Se Eliminó el código ' + data.C3D, Columna: data.Columna, Fila:data.Fila });
        });
        return ret;
    }
    //valida regla 3, 4, 5
    Regla3(codigo:Instruccion3D[]):Instruccion3D[] {
        var ret:Instruccion3D[] = [];
        var sentenciasVerdaderas:Instruccion3D[] = [];
        for(var i = 0; i<codigo.length;i++){
            if(codigo[i].TipoInstruccion == TipoInstruccion.If && codigo[i+1].TipoInstruccion == TipoInstruccion.GoTo){
                var instruccion = codigo[i].Dato as Asignacion;
                if(instruccion.Operacion.TipoOperador == TipoOperador.Igual){
                    if(instruccion.Operacion.ExpresionIzquierda.Valor == instruccion.Operacion.ExpresionDerecha.Valor){
                        switch(instruccion.Operacion.TipoOperador){
                            case TipoOperador.Igual : {
                                var textIni = instruccion.C3D;
                                var etiqueta = new Etiqueta(instruccion.Fila,instruccion.Columna,instruccion.ID,'goto ' + instruccion.ID + ';');
                                codigo[i].Dato = etiqueta;
                                codigo[i].TipoInstruccion = TipoInstruccion.GoTo;
                                ret.push(codigo[i]);
                                for(var x = i+2; x<codigo.length;x++){
                                    ret.push(codigo[x]);
                                }
                                this.Reporte.push({Regla:4, AccionRealizada:'Código Cambiado: ' + textIni + ' Por: ' + etiqueta.C3D, Columna: instruccion.Columna, Fila:instruccion.Fila });
                                return ret;
                            }
                        }      
                    }else if(instruccion.Operacion.ExpresionIzquierda.TipoParametro == TipoParametro.Entero &&
                         instruccion.Operacion.ExpresionDerecha.TipoParametro == TipoParametro.Entero){
                            switch(instruccion.Operacion.TipoOperador){
                                case TipoOperador.Igual : {
                                    var textIni = instruccion.C3D;
                                    for(var x = i+1; x<codigo.length;x++){
                                        ret.push(codigo[x]);
                                    }
                                    this.Reporte.push({Regla:5, AccionRealizada:'Eliminación de : ' + textIni, Columna: instruccion.Columna, Fila:instruccion.Fila });
                                    return ret;
                                }
                            }   
                    }
                    for(var j = i + 2; j<codigo.length;j++){
                        if(codigo[j].TipoInstruccion == TipoInstruccion.Etiqueta){
                            var etiqueta = codigo[j].Dato as Etiqueta;
                            if(etiqueta.ID == instruccion.ID){ //etiqueta verdadera
                                var temp  = j + 1;
                                while(temp < codigo.length && codigo[temp].TipoInstruccion != TipoInstruccion.Etiqueta){
                                    sentenciasVerdaderas.push(codigo[temp]);
                                    temp++;
                                }
                                var etiquetaFalsa =  codigo[i+1].Dato as Etiqueta;
                                var textIni = instruccion.C3D;
                                switch(instruccion.Operacion.TipoOperador){
                                    case TipoOperador.Igual : {
                                        instruccion.Operacion.TipoOperador = TipoOperador.Diferente;
                                        instruccion.Operacion.C3D = instruccion.Operacion.ExpresionIzquierda.C3D + '!=' + instruccion.Operacion.ExpresionDerecha.C3D;
                                        instruccion.C3D = 'if(' + instruccion.Operacion.C3D + ') ' + etiquetaFalsa.C3D;
                                        instruccion.ID = etiquetaFalsa.ID;
                                        codigo[i].Dato = instruccion;
                                        var textFin = instruccion.C3D;
                                        ret.push(codigo[i]);
                                        sentenciasVerdaderas.forEach(element => {
                                            ret.push(element);
                                        });
                                        //ret.push(codigo[i+1]);
                                        for(var x = temp; x<codigo.length;x++){
                                            ret.push(codigo[x]);
                                        }
                                        this.Reporte.push({Regla:3, AccionRealizada:'Código Cambiado: ' + textIni + ' Por: ' + textFin, Columna: instruccion.Columna, Fila:instruccion.Fila });
                                        return ret;
                                    }
                                }
                                
                            }
                        }
                    }
                }else{
                    ret.push(codigo[i]);
                }
            }else{
                ret.push(codigo[i]);
            }
        }
        this.optimizacion3 = false;
        return ret;
    }

    Regla6(codigo:Instruccion3D[]):Instruccion3D[] {
        var ret:Instruccion3D[] = [];
        for(var i = 0; i < codigo.length;i++){
            if(codigo[i].TipoInstruccion == TipoInstruccion.GoTo){
                var goto = codigo[i].Dato as Etiqueta;
                var instrucciones:Instruccion3D[] = [];
                for(var j = i + 1; j < codigo.length;j++){
                    if(codigo[j].TipoInstruccion == TipoInstruccion.Etiqueta ){
                        if(instrucciones.length <= 0) break;
                        var etiqueta = codigo[j].Dato as Etiqueta;
                        if(etiqueta.ID == goto.ID){
                            if(codigo[j+1].TipoInstruccion == TipoInstruccion.GoTo ){
                                this.Reporte.push({Regla:6, AccionRealizada:'Código Cambiado: ' + goto.C3D + ' Por: ' + (codigo[j+1].Dato as any).C3D, Columna: goto.Columna, Fila:goto.Fila });
                                codigo[i] = codigo[j+1];
                                //ret.push(codigo[i]);
                                break;
                            }else{
                                //ret.push(codigo[i]);
                                break;
                            }
                        }else{
                            instrucciones.push(codigo[j]);
                        }
                    }else{
                        instrucciones.push(codigo[j]);
                    }
                    instrucciones.push(codigo[j]);
                }
                ret.push(codigo[i]);
            }else{
                ret.push(codigo[i]);
            }
        }
        return ret;
    }

    Regla7(codigo:Instruccion3D[]):Instruccion3D[] {
        var ret:Instruccion3D[] = [];
        for(var i = 0; i < codigo.length;i++){
            if(codigo[i].TipoInstruccion == TipoInstruccion.If){
                var ifSentence = codigo[i].Dato as Asignacion;
                var instrucciones:Instruccion3D[] = [];
                for(var j = i + 1; j < codigo.length;j++){
                    if(codigo[j].TipoInstruccion == TipoInstruccion.Etiqueta){
                        var etiqueta = codigo[j].Dato as Etiqueta;
                        if(etiqueta.ID == ifSentence.ID){
                            if(codigo[j+1].TipoInstruccion == TipoInstruccion.GoTo){
                                this.Reporte.push({Regla:7, AccionRealizada:'Código Cambiado: ' + ifSentence.C3D + ' Por: ' + 'if(' + ifSentence.Operacion.C3D + ') ' + (codigo[j+1].Dato as any).C3D, Columna: ifSentence.Columna, Fila:ifSentence.Fila });
                                ifSentence.C3D = 'if(' + ifSentence.Operacion.C3D + ') ' + (codigo[j+1].Dato as any).C3D;
                                ifSentence.ID = (codigo[j+1].Dato as any).ID;
                                codigo[i].Dato = ifSentence;
                                ret.push(codigo[i]);
                                break;
                            }else{
                                ret.push(codigo[i]);
                                break;
                            }
                        }else{
                            instrucciones.push(codigo[j]);
                        }
                    }else{
                        instrucciones.push(codigo[j]);
                    }
                }
            }else{
                ret.push(codigo[i]);
            }
        }
        return ret;
    }

    Regla8(codigo:Instruccion3D[]):Instruccion3D[] {
        var ret:Instruccion3D[] = [];
        codigo.forEach(element => {
            if(element.TipoInstruccion == TipoInstruccion.Asignacion){
                var asignacion = element.Dato as Asignacion;
                if(asignacion.Operacion.TipoOperador == TipoOperador.Mas || asignacion.Operacion.TipoOperador == TipoOperador.Menos
                    && asignacion.Operacion.ExpresionIzquierda.Valor != undefined && asignacion.Operacion.ExpresionDerecha.Valor != undefined){
                    if(asignacion.Operacion.ExpresionIzquierda.Valor.toString() == asignacion.ID && asignacion.Operacion.ExpresionDerecha.Valor.toString() == "0"){
                        switch(asignacion.Operacion.TipoOperador){
                            case TipoOperador.Mas:{
                                this.Reporte.push({Regla:8, AccionRealizada:'Eliminando expresión : ' + asignacion.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                            case TipoOperador.Menos:{
                                this.Reporte.push({Regla:9, AccionRealizada:'Eliminando expresión : ' + asignacion.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                        }
                    }else if(asignacion.Operacion.ExpresionIzquierda.Valor.toString() != asignacion.ID && asignacion.Operacion.ExpresionDerecha.Valor.toString() == "0"){
                        switch(asignacion.Operacion.TipoOperador){
                            case TipoOperador.Mas:{
                                this.Reporte.push({Regla:12, AccionRealizada:'Modificación expresión : ' + asignacion.C3D + ', Por: ' + asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                            case TipoOperador.Menos:{
                                this.Reporte.push({Regla:13, AccionRealizada:'Modificación expresión : ' + asignacion.C3D + ', Por: ' + asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                        }

                        asignacion.C3D = asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D+';';
                        asignacion.Operacion.ExpresionDerecha = null;
                        asignacion.Operacion.TipoOperador = TipoOperador.None;
                        element.Dato = asignacion;
                        ret.push(element);
                    }
                    else{
                        ret.push(element);
                    }
                }else if(asignacion.Operacion.TipoOperador == TipoOperador.Por || asignacion.Operacion.TipoOperador == TipoOperador.Div){
                    console.log('asignacion');
                    console.log(asignacion);
                    if(asignacion.Operacion.ExpresionIzquierda.Valor.toString() == asignacion.ID && asignacion.Operacion.ExpresionDerecha.Valor.toString() == "1"){
                        switch(asignacion.Operacion.TipoOperador){
                            case TipoOperador.Por:{
                                this.Reporte.push({Regla:10, AccionRealizada:'Eliminando expresión : ' + asignacion.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                            case TipoOperador.Div:{
                                this.Reporte.push({Regla:11, AccionRealizada:'Eliminando expresión : ' + asignacion.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                        }
                    }else if(asignacion.Operacion.ExpresionIzquierda.Valor.toString() != asignacion.ID && asignacion.Operacion.ExpresionDerecha.Valor.toString() == "1"){
                        switch(asignacion.Operacion.TipoOperador){
                            case TipoOperador.Por:{
                                this.Reporte.push({Regla:14, AccionRealizada:'Modificación expresión : ' + asignacion.C3D + ', Por: ' + asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                            case TipoOperador.Div:{
                                this.Reporte.push({Regla:15, AccionRealizada:'Modificación expresión : ' + asignacion.C3D + ', Por: ' + asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                            }
                        asignacion.C3D = asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D +';';
                        asignacion.Operacion.ExpresionDerecha = null;
                        asignacion.Operacion.TipoOperador = TipoOperador.None;
                        element.Dato = asignacion;
                        ret.push(element);
                        }
                    }else {
                        ret.push(element);
                    }
                }else{
                    ret.push(element);
                }
            }else{
                ret.push(element);
            }
        });
        return ret;
    }

    Regla16(codigo:Instruccion3D[]):Instruccion3D[] {
        var ret:Instruccion3D[] = [];
        codigo.forEach(element => {
            if(element.TipoInstruccion == TipoInstruccion.Asignacion){
                var asignacion = element.Dato as Asignacion;
                 if(asignacion.Operacion.TipoOperador == TipoOperador.Por
                    && asignacion.Operacion.ExpresionIzquierda.Valor != undefined && asignacion.Operacion.ExpresionDerecha.Valor != undefined){
                    if(asignacion.Operacion.ExpresionIzquierda.Valor.toString() != asignacion.ID && asignacion.Operacion.ExpresionDerecha.Valor.toString() == "2"){
                        this.Reporte.push({Regla:16, AccionRealizada:'Modificación expresión : ' + asignacion.C3D + ', Por: ' + asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D + '+' + asignacion.Operacion.ExpresionIzquierda.C3D, Columna: asignacion.Columna, Fila:asignacion.Fila });
                        asignacion.C3D = asignacion.ID +' = ' + asignacion.Operacion.ExpresionIzquierda.C3D + '+' + asignacion.Operacion.ExpresionIzquierda.C3D +';';
                        asignacion.Operacion.ExpresionDerecha = asignacion.Operacion.ExpresionIzquierda;
                        asignacion.Operacion.TipoOperador = TipoOperador.Mas;
                        asignacion.Operacion.C3D = asignacion.Operacion.ExpresionIzquierda.C3D + '+' + asignacion.Operacion.ExpresionIzquierda.C3D;
                        element.Dato = asignacion;
                        ret.push(element);
                    }else if(asignacion.Operacion.ExpresionDerecha.Valor.toString() == "0"){
                        this.Reporte.push({Regla:17, AccionRealizada:'Modificación expresión : ' + asignacion.C3D + ', Por: ' + asignacion.ID +' = 0' , Columna: asignacion.Columna, Fila:asignacion.Fila });
                        asignacion.C3D = asignacion.ID +' = 0;';
                        asignacion.Operacion.ExpresionIzquierda.Valor = asignacion.Operacion.ExpresionDerecha;
                        asignacion.Operacion.ExpresionDerecha =null;
                        asignacion.Operacion.TipoOperador = TipoOperador.None;
                        asignacion.Operacion.C3D = '0';
                        element.Dato = asignacion;
                        ret.push(element);
                    }else {
                        ret.push(element);
                    }
                }else if(asignacion.Operacion.TipoOperador == TipoOperador.Div
                    && asignacion.Operacion.ExpresionIzquierda.Valor != undefined && asignacion.Operacion.ExpresionDerecha.Valor != undefined){
                    if(asignacion.Operacion.ExpresionDerecha.Valor.toString() != asignacion.ID && asignacion.Operacion.ExpresionIzquierda.Valor.toString() == "0"){
                        this.Reporte.push({Regla:18, AccionRealizada:'Modificación expresión : ' + asignacion.C3D + ', Por: ' + asignacion.ID +' = 0' , Columna: asignacion.Columna, Fila:asignacion.Fila });
                        asignacion.C3D = asignacion.ID +' = 0;';
                        asignacion.Operacion.ExpresionDerecha =null;
                        asignacion.Operacion.TipoOperador = TipoOperador.None;
                        asignacion.Operacion.C3D = '0';
                        element.Dato = asignacion;
                        ret.push(element);
                    }else {
                        ret.push(element);
                    }
                }else{
                    ret.push(element);
                }
            }else{
                ret.push(element);
            }
        });
        return ret;
    }
}