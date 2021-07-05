import { Entorno } from "../AST/Entorno";
import { Primitiva, TipoPrim } from "../Expresiones/Primitiva";
import errores from "../Global/ListaError";
export class Llamada {
    constructor(nombre, parametros, linea, columna) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(entornoXQuery, entornoXML) {
        if (entornoXQuery.existeMetodo(this.nombre)) {
            let funcion = entornoXQuery.obtenerMetodo(this.nombre);
            let entXQLocal = new Entorno("Funcion " + this.nombre, entornoXQuery, entornoXQuery.global);
            /* SE VALIDAN LOS PARAMETROS: PRIMERO LA CANTIDAD Y LUEGO LOS TIPOS */
            let sizeParam = funcion.getParametros().length;
            if (sizeParam === this.parametros.length) {
                /* SE AGREGAN LOS PARAMETROS A LA TABLA DE SIMBOLOS */
                let i;
                let bandera = true;
                let valoresLlamada = [];
                /*for(i = 0; i < sizeParam; i++){
                    let paramActual = this.parametros[i];
                    if (paramActual instanceof expresion){
                        valoresLlamada.push(paramActual.getValor(entXQLocal));
                    }else if (paramActual instanceof Llamada){
                        let res = paramActual.ejecutar(entXQLocal, entornoXML);
                        valoresLlamada.push(res.getValor(entXQLocal));
                    }
                }*/
                /*if (bandera){
                    /* SE AGREGAN LOS PARAMETROS A LA TABLA DE SIMBOLOS
                    for(i = 0; i < sizeParam; i++){
                        let param = funcion.getParametros()[i];
                        entXQLocal.agregarSimbolo(param.nombre, new Simbolo(Tipo.XQ_VARI, param.nombre, valoresLlamada[i], this.linea, this.columna));
                    }

                    //console.log('se ejecuta llamada');
                    /* SE EJECUTAN LAS INSTRUCCIONES
                    sizeParam = metFunc.getInstrucciones();
                    for(i = 0; i < sizeParam.length; i++){
                        let inst = sizeParam[i];
                        console.log(inst);
                        if (inst instanceof expresion){
                            let valor = auxiliar.getValor(local);
                        }else if (inst instanceof instruccion){
                            //console.log('entra aca');
                            let auxiliar = inst.ejecutar(local);
                            console.log(auxiliar);
                            if (auxiliar instanceof _return){ // return;
                                if (auxiliar.expresion === null){ // Es un metodo
                                    display.deleteUltimo();
                                    break;
                                }else{//Es funcion
                                    let t;
                                    let val;
                                    if (auxiliar.expresion instanceof expresion){
                                        val = auxiliar.expresion.getValor(local);
                                        t = auxiliar.expresion.getTipo(local);
                                    }else if (auxiliar.expresion instanceof llamada){
                                        let res = auxiliar.expresion.ejecutar(local);
                                        val = res.getValor(local);
                                        t = res.getTipo(local);
                                    }
                                    //let val = auxiliar.expresion.getValor(local);
                                    //let t = auxiliar.expresion.getTipo(local);
                                    if (t === metFunc.getTipo()){
                                        if (display.getUltimo() === 'metodo' || display.getUltimo() === 'funcion')
                                            display.deleteUltimo();
                                        return new primitivo(this.tipo, val);
                                    }else
                                        errores.agregarError('semantico', 'El tipo de retorno es distinto al tipo de funcion',
                                                                this.linea, this.columna);
                                }
                            }
                        }
                    }
                }*/
            }
            else
                errores.agregarError('semantico', 'La cantidad de parametros no es igual', this.linea, this.columna);
        }
        else
            errores.agregarError('semantico', 'No existe la funcion ' + this.nombre, this.linea, this.columna);
        return new Primitiva('', TipoPrim.ERROR, this.linea, this.columna);
    }
}
