import { Optimizacion, ReglaOptimizacion } from "../Reporte/Optimizacion";
import { TipoExpresion3D } from "./Expresiones3D/Expresion3D";
import { Operacion3D, TipoOperacion3D } from "./Expresiones3D/Operacion3D";
import { Primitiva3D, TipoPrim3D } from "./Expresiones3D/Primitiva3D";
import { Asignacion3D } from "./Instrucciones3D/Asignacion3D";
import { Etiqueta3D } from "./Instrucciones3D/Etiqueta3D";
import { Goto3D } from "./Instrucciones3D/Goto3D";
import { If3D } from "./Instrucciones3D/If3D";
import { TipoInstruccion3D } from "./Instrucciones3D/Instruccion3D";
import { Representacion3D } from "./Instrucciones3D/Representacion3D";
export class Optimizer {
    constructor() {
        this.reporte = [];
    }
    aplicar(listaInstrucciones, reporte) {
        this.reporte = reporte;
        listaInstrucciones = this.regla1(listaInstrucciones);
        listaInstrucciones = this.regla2(listaInstrucciones);
        listaInstrucciones = this.regla3_y_regla4(listaInstrucciones);
        listaInstrucciones = this.regla5(listaInstrucciones);
        listaInstrucciones = this.reglasAlgebraicas(listaInstrucciones);
        return listaInstrucciones;
    }
    instruccionesToString(arrayInst) {
        let cadena = "";
        arrayInst.forEach((inst) => {
            cadena += inst.getCodigo3D() + "\n";
        });
        return cadena;
    }
    agregarReporte(codigoNuevo, codigoEliminado, numRegla) {
        let codeBefore = this.instruccionesToString(codigoEliminado);
        let codeNow = this.instruccionesToString(codigoNuevo);
        let fila, col;
        if (codigoNuevo.length > 0) {
            fila = codigoNuevo[0].fila;
            col = codigoNuevo[0].columna;
        }
        else {
            fila = codigoEliminado[0].fila;
            col = codigoEliminado[0].columna;
        }
        let nodoOpt = new Optimizacion(numRegla, codeBefore, codeNow, fila, col);
        this.reporte.push(nodoOpt);
    }
    /*          REGLA 1
        goto L1;
        <instrucciones>                     goto L1;
        L1:             ------------->      L1:
        T3 = T1+T3;                         T3 = T1+T3;
    */
    regla1(listaInstrucciones) {
        console.log("--------- Aplicando REGLA 1 ------------- ");
        let contador = 0;
        let nuevasInstrucciones = [];
        let codigoEliminado = [];
        let codigoNuevo = [];
        if (listaInstrucciones != null) {
            //Recorrer la lista de instrucciones
            let flag = false;
            for (let i = 0; i < listaInstrucciones.length; i++) {
                let instruccion = listaInstrucciones[i];
                //Ver si la instruccion es un GOTO
                if (instruccion.getTipoInstruccion() === TipoInstruccion3D.GOTO) {
                    flag = true;
                    codigoNuevo.push(instruccion);
                    continue;
                }
                else if (instruccion.getTipoInstruccion() === TipoInstruccion3D.ETIQUETA) {
                    flag = false;
                    codigoNuevo.push(instruccion);
                    if (codigoEliminado.length > 1) {
                        //Agregar a reporte.
                        this.agregarReporte(codigoNuevo, codigoEliminado, ReglaOptimizacion.REGLA1);
                    }
                    //Vaciar listas auxiliares
                    codigoNuevo = this.marcarAsOptimizadas(codigoNuevo, true);
                    nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                    contador += codigoEliminado.length;
                    codigoNuevo = [];
                    codigoEliminado = [];
                    continue;
                }
                //Si no se ha encontrado un GOTO pushear la instruccion
                if (!flag) {
                    if (!instruccion.isOptimizada()) {
                        instruccion.setOptimizada(true);
                        nuevasInstrucciones.push(instruccion);
                    }
                }
                else {
                    codigoEliminado.push(instruccion);
                }
            }
        }
        console.log("Se eliminaron :", contador + " instrucciones");
        console.log("-------------------------------------------");
        return this.marcarAsOptimizadas(nuevasInstrucciones, false);
    }
    /*          REGLA 2
        if(4 == 4) goto L1;
        goto L2;                            if(4 != 4) goto L2;
        L1:             ------------->      <instr L1>
        <instr L1>                          L2:
        L2:                                 <instr L2>
        <instr L2>
    */
    regla2(listaInstrucciones) {
        console.log("--------- Aplicando REGLA 2 ------------- ");
        let contador = 0;
        let nuevasInstrucciones = [];
        let nombreEtiqueta = "";
        if (listaInstrucciones != null) {
            let codigoEliminado = [];
            let codigoNuevo = [];
            //Recorrer Instrucciones
            let seOptimizo = false;
            for (let i = 0; i < listaInstrucciones.length; i++) {
                let instruccion = listaInstrucciones[i];
                //Ver si la instruccion es un IF
                if (instruccion instanceof Etiqueta3D) {
                    nombreEtiqueta = instruccion.identificador;
                }
                if (instruccion instanceof If3D) {
                    let miIf;
                    miIf = instruccion;
                    if (i + 1 < listaInstrucciones.length) {
                        //Revisar si la siguiente instruccion (codigo falso)
                        //Es un salto (Goto);
                        let sigInst = listaInstrucciones[i + 1];
                        if (sigInst instanceof Goto3D) {
                            //Si es un salto, proceder con la optimizacion regla 2.
                            //0. Agregar a la lista de codigo eliminado
                            let ifAnterior = this.crearIfAnterior(miIf);
                            codigoEliminado.push(ifAnterior);
                            codigoEliminado.push(sigInst);
                            //1. Negar condicion del If
                            let etFalsa = sigInst.identificador;
                            miIf.negarCondicion();
                            //2. Hacer que la etVerdadera sea el salto de 'sigInst'
                            let gotoAnterior = miIf.gotoEtiqueta;
                            miIf.gotoEtiqueta = sigInst;
                            //3. Obtener el nombre de la etiqueta del goto anterior
                            let nameEtiquetaLV = gotoAnterior.identificador;
                            //4. Buscar en la lista de instrucciones esta etiqueta
                            let instEtAnterior;
                            instEtAnterior = this.getCodigoEtiqueta(nameEtiquetaLV, listaInstrucciones, 0, true);
                            this.cambiarReferencias(nameEtiquetaLV, nombreEtiqueta, listaInstrucciones, 0);
                            let instEtNueva;
                            instEtNueva = this.getCodigoEtiqueta(etFalsa, listaInstrucciones, 0, true);
                            codigoEliminado = codigoEliminado.concat(instEtAnterior[0]);
                            let auxiliar1 = new Representacion3D(TipoInstruccion3D.REPRESENTACION, "[Instrucciones_" + nameEtiquetaLV + "]", -1, -1);
                            codigoEliminado.push(auxiliar1);
                            let auxiliar2 = new Representacion3D(TipoInstruccion3D.REPRESENTACION, "[Instrucciones_" + etFalsa + "]", -1, -1);
                            codigoEliminado = codigoEliminado.concat(instEtNueva[0]);
                            codigoEliminado.push(auxiliar2);
                            seOptimizo = true;
                            //Pushear el If nuevo (con condicion negada y salto Lf;)
                            codigoNuevo.push(miIf);
                            //Concatenar las instrucciones de la etiqueta anterior L1 (ahora estaran como codigo falso)
                            let auxReporte = [];
                            auxReporte = auxReporte.concat(codigoNuevo);
                            auxReporte.push(auxiliar1);
                            auxReporte.push(instEtNueva[0]);
                            auxReporte.push(auxiliar2);
                            instEtAnterior.shift();
                            codigoNuevo = codigoNuevo.concat(instEtAnterior);
                            codigoNuevo = codigoNuevo.concat(instEtNueva);
                            //Agregar el codigoNuevo a la lista de nuevas instrucciones
                            codigoNuevo = this.marcarAsOptimizadas(codigoNuevo, true);
                            nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                            //Agregar a reporte.
                            this.agregarReporte(auxReporte, codigoEliminado, ReglaOptimizacion.REGLA2);
                            codigoNuevo = [];
                            contador += codigoEliminado.length;
                            codigoEliminado = [];
                        }
                    }
                }
                if (!seOptimizo) {
                    if (!instruccion.isEliminada() && !instruccion.isOptimizada()) {
                        instruccion.setOptimizada(true);
                        nuevasInstrucciones.push(instruccion);
                    }
                }
                else {
                    seOptimizo = false;
                }
            }
        }
        console.log("Se eliminaron :", contador + " instrucciones");
        console.log("-------------------------------------------");
        return this.marcarAsOptimizadas(nuevasInstrucciones, false);
    }
    /*          REGLA 3
        if(1 == 1) goto L1;
        goto L2;            ------------->      goto L1;

                REGLA 4
        if( 4 == 1) goto L1; ------------->      goto L2;
        goto L2;
        
    */
    regla3_y_regla4(listaInstrucciones) {
        console.log("--------- Aplicando REGLA 3 y REGLA 4 ------------- ");
        let contador = 0;
        let nuevasInstrucciones = [];
        let codigoNuevo = [];
        let codigoEliminado = [];
        let seOptimizo = false;
        for (let i = 0; i < listaInstrucciones.length; i++) {
            let instruccion = listaInstrucciones[i];
            if (instruccion instanceof If3D) {
                //Si es If ver si sus condiciones son constantes (INTEGER, DOUBLE)
                let condicion = instruccion.condicion;
                if (condicion instanceof Operacion3D) {
                    //Ver si el operando izquierdo y derecho son constantes
                    let izq = condicion.op_izq;
                    let der = condicion.op_der;
                    if (this.sonConstantes(izq, der)) {
                        //Obtener su resultado.
                        let resultado = condicion.getValorRelacional();
                        //1. Obtener la etiqueta verdadera
                        let etVerdadera = instruccion.gotoEtiqueta;
                        //2. Obtener codigo Falso
                        let etFalsa;
                        let numRegla = null;
                        if (i + 1 < listaInstrucciones.length) {
                            if (listaInstrucciones[i + 1] instanceof Etiqueta3D) {
                                etFalsa = listaInstrucciones[i + 1];
                                seOptimizo = true;
                                //Si es verdadero, aplicar regla 3;
                                if (resultado) {
                                    //Se deja solo el goto Verdadero
                                    codigoNuevo.push(etVerdadera);
                                    numRegla = ReglaOptimizacion.REGLA3;
                                }
                                else {
                                    //Si es falso, aplicar regla 4;
                                    codigoNuevo.push(etFalsa);
                                    numRegla = ReglaOptimizacion.REGLA4;
                                }
                                //Se pushea el if al codigo eliminado
                                codigoEliminado.push(instruccion);
                                //Se pushea el salto falso al codigo eliminado
                                codigoEliminado.push(etFalsa);
                                //Se agrega al reporte
                                this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                //Se agrega a la lista de instrucciones el codigo nuevo
                                codigoNuevo = this.marcarAsOptimizadas(codigoNuevo, true);
                                nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                //Se vacian las listas
                                codigoEliminado = [];
                                codigoNuevo = [];
                            }
                        }
                    }
                }
            }
            if (!seOptimizo) {
                if (!instruccion.isOptimizada()) {
                    instruccion.setOptimizada(true);
                    nuevasInstrucciones.push(instruccion);
                }
            }
            else {
                seOptimizo = false;
            }
        }
        console.log("Se eliminaron :", contador + " instrucciones");
        console.log("-------------------------------------------");
        return this.marcarAsOptimizadas(nuevasInstrucciones, false);
    }
    /*          REGLA 5
        T3 = T2;
        <instrucciones>            ------------->      T3 = T2;
        T2 = T3;                                        <instrucciones>
        
    */
    regla5(listaInstrucciones) {
        console.log("--------- Aplicando REGLA 5------------- ");
        let contador = 0;
        let nuevasInstrucciones = [];
        let codigoNuevo = [];
        let codigoEliminado = [];
        let seOptimizo = false;
        for (let i = 0; i < listaInstrucciones.length; i++) {
            let instruccion = listaInstrucciones[i];
            if (instruccion instanceof Asignacion3D) {
                //Ver si su asignacion es hacia otra variable.
                let asignacion = instruccion.expresion;
                if (asignacion instanceof Primitiva3D) {
                    if (asignacion.getTipoPrim3D() === TipoPrim3D.IDENTIFIER) {
                        let Id1 = instruccion.identificador;
                        let Id2 = asignacion.getValor();
                        //Seguir iterando sobre las instrucciones y ver si se encuentra
                        //una asignacion del tipo id2 = id1;
                        let n = i + 1;
                        let auxInst;
                        let auxiliarInstr = [];
                        while (n < listaInstrucciones.length) {
                            auxInst = listaInstrucciones[n];
                            //Ver si es asignacion
                            if (auxInst instanceof Asignacion3D) {
                                if (auxInst.identificador == Id1) {
                                    //a cambia de valor, salir del ciclo.
                                    break;
                                }
                                //ver si es = idx
                                let auxAsig = auxInst.expresion;
                                if (auxAsig instanceof Primitiva3D) {
                                    if (auxAsig.getTipoPrim3D() === TipoPrim3D.IDENTIFIER) {
                                        //Ver si es id2 = id1;
                                        if (auxInst.identificador == Id2 && auxAsig.getValor() == Id1) {
                                            //Se optimiza. (eliminar esta)
                                            seOptimizo = true;
                                            codigoEliminado.push(auxInst);
                                            codigoNuevo.push(instruccion);
                                            codigoNuevo = codigoNuevo.concat(auxiliarInstr);
                                            //Agregar a reporte.
                                            this.agregarReporte(codigoNuevo, codigoEliminado, ReglaOptimizacion.REGLA5);
                                            //Agregar a la lista de instrucciones nueva
                                            codigoNuevo = this.marcarAsOptimizadas(codigoNuevo, true);
                                            nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                            contador += codigoEliminado.length;
                                            codigoEliminado = [];
                                            codigoNuevo = [];
                                            break;
                                        }
                                    }
                                }
                            }
                            else if (auxInst instanceof Etiqueta3D) {
                                break;
                            }
                            auxiliarInstr.push(auxInst);
                            n = n + 1;
                        }
                        if (seOptimizo) {
                            i = n;
                        }
                    }
                }
            }
            if (!seOptimizo) {
                if (!instruccion.isOptimizada()) {
                    instruccion.setOptimizada(true);
                    nuevasInstrucciones.push(instruccion);
                }
            }
            else {
                seOptimizo = false;
            }
        }
        console.log("Se eliminaron :", contador + " instrucciones");
        console.log("-------------------------------------------");
        return this.marcarAsOptimizadas(nuevasInstrucciones, false);
    }
    reglasAlgebraicas(listaInstrucciones) {
        console.log("--------- Aplicando REGLAS SIMPLIFICACION ALGEBRAICA  ------------- ");
        let contador = 0;
        let nuevasInstrucciones = [];
        let codigoEliminado = [];
        let codigoNuevo = [];
        let seOptimizo = false;
        for (let i = 0; i < listaInstrucciones.length; i++) {
            let instruccion = listaInstrucciones[i];
            if (instruccion instanceof Asignacion3D) {
                //Ver si la asignacion corresponde a una operacion Tx = Ty op x
                let expr = instruccion.expresion;
                if (expr instanceof Operacion3D) {
                    let izq = expr.op_izq;
                    let der = expr.op_der;
                    if (der != null) {
                        if (izq.getTipoPrim3D() === TipoPrim3D.IDENTIFIER) {
                            if (izq.getValor() === instruccion.identificador) {
                                //REGLA 6 T1 = T1+0 <-- ELIMINAR
                                if (der.getValor() == 0) {
                                    //Si es regla 6 o 7, optimizar
                                    //Agregar a reporte.
                                    let numRegla;
                                    if (expr.getTipoOperacion() === TipoOperacion3D.SUMA) {
                                        codigoEliminado.push(instruccion);
                                        numRegla = ReglaOptimizacion.REGLA6;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                    else if (expr.getTipoOperacion() === TipoOperacion3D.RESTA) {
                                        codigoEliminado.push(instruccion);
                                        numRegla = ReglaOptimizacion.REGLA7;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                    else if (expr.getTipoOperacion() === TipoOperacion3D.MULTIPLICACION) {
                                        //Es x = X * 0 (REGLA 15)
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.INTEGER, 0, "0", izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA15;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                }
                                else if (der.getValor() === 1) {
                                    //Si es regla 8 o 9, optimizar
                                    //Agregar a reporte.
                                    let numRegla;
                                    if (expr.getTipoOperacion() === TipoOperacion3D.MULTIPLICACION) {
                                        codigoEliminado.push(instruccion);
                                        numRegla = ReglaOptimizacion.REGLA8;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                    else if (expr.getTipoOperacion() === TipoOperacion3D.DIVISION) {
                                        codigoEliminado.push(instruccion);
                                        numRegla = ReglaOptimizacion.REGLA9;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                }
                            }
                            else {
                                //Es de la forma X = y op algo
                                if (der.getValor() === 0) {
                                    let numRegla;
                                    if (expr.getTipoOperacion() === TipoOperacion3D.SUMA) {
                                        //Es suma x = y + 0 (Regla 10) => x = y
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.IDENTIFIER, izq.getValor(), izq.getCodigo3D(), izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA10;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                    else if (expr.getTipoOperacion() === TipoOperacion3D.RESTA) {
                                        //Es x = y - 0 --> x = y; (Regla 11)
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.IDENTIFIER, izq.getValor(), izq.getCodigo3D(), izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA11;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                    else if (expr.getTipoOperacion() === TipoOperacion3D.MULTIPLICACION) {
                                        //Es x = y * 0 (REGLA 15)
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.INTEGER, 0, "0", izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA15;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                }
                                else if (der.getValor() === 1) {
                                    let numRegla;
                                    if (expr.getTipoOperacion() === TipoOperacion3D.MULTIPLICACION) {
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.IDENTIFIER, izq.getValor(), izq.getCodigo3D(), izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA12;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                    else if (expr.getTipoOperacion() === TipoOperacion3D.DIVISION) {
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.IDENTIFIER, izq.getValor(), izq.getCodigo3D(), izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA13;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                }
                                else if (der.getValor() === 2) {
                                    let numRegla;
                                    if (expr.getTipoOperacion() === TipoOperacion3D.MULTIPLICACION) {
                                        //Es x = y *2 -> x = y + y (REGLA 14)
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Operacion3D(TipoExpresion3D.OPERACION, TipoOperacion3D.SUMA, izq, izq, "", izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA14;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                }
                            }
                        }
                        else if (izq.getTipoPrim3D() === TipoPrim3D.INTEGER) {
                            if (izq.getValor() === 0) {
                                if (expr.getTipoOperacion() === TipoOperacion3D.DIVISION) {
                                    //Ver si el derecho es id.
                                    let numRegla;
                                    if (der.getTipoPrim3D() === TipoPrim3D.IDENTIFIER) {
                                        //Regla 16: x = 0/y -> x = 0
                                        codigoEliminado.push(instruccion);
                                        let nuevaExpr = new Primitiva3D(TipoExpresion3D.PRIMITIVA, TipoPrim3D.INTEGER, 0, "0", izq.fila, izq.columna);
                                        let nuevaAsig = new Asignacion3D(TipoInstruccion3D.ASIGNORMAL, instruccion.identificador, nuevaExpr, "", instruccion.fila, instruccion.columna);
                                        codigoNuevo.push(nuevaAsig);
                                        numRegla = ReglaOptimizacion.REGLA15;
                                        this.agregarReporte(codigoNuevo, codigoEliminado, numRegla);
                                        contador += codigoEliminado.length;
                                        nuevasInstrucciones = nuevasInstrucciones.concat(codigoNuevo);
                                        codigoEliminado = [];
                                        codigoNuevo = [];
                                        seOptimizo = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (!seOptimizo) {
                nuevasInstrucciones.push(instruccion);
            }
            else {
                seOptimizo = false;
            }
        }
        console.log("Se eliminaron :", contador + " instrucciones");
        console.log("-------------------------------------------");
        console.log("MY INST ARE: ", nuevasInstrucciones);
        return nuevasInstrucciones;
    }
    cambiarReferencias(etiquetaEliminada, nuevaReferencia, listaInstrucciones, pos) {
        while (pos < listaInstrucciones.length) {
            let auxInst = listaInstrucciones[pos];
            if (auxInst instanceof Goto3D) {
                if (auxInst.getReferencia() === etiquetaEliminada) {
                    auxInst.changeReferencia(nuevaReferencia);
                }
            }
            pos = pos + 1;
        }
    }
    marcarAsOptimizadas(codigoNuevo, optimizada) {
        let opt = [];
        codigoNuevo.forEach((s) => {
            s.setOptimizada(optimizada);
            opt.push(s);
        });
        console.log("RETURNING: ", opt);
        return opt;
    }
    getCodigoEtiqueta(etiquetaBuscar, listaInstrucciones, pos, addEtiqueta) {
        let instruccionesEtiqueta = [];
        let found = false;
        while (pos < listaInstrucciones.length) {
            let auxInst = listaInstrucciones[pos];
            if (found) {
                //Pushear a las instrucciones de la etiqueta anterior
                if (auxInst instanceof Etiqueta3D) {
                    break;
                }
                instruccionesEtiqueta.push(auxInst);
                auxInst.setEliminada(true);
            }
            if (auxInst instanceof Etiqueta3D) {
                //Comparar nombres.
                if (auxInst.identificador === etiquetaBuscar) {
                    //Se encontro.
                    if (addEtiqueta) {
                        auxInst.setEliminada(true);
                        instruccionesEtiqueta.push(auxInst);
                    }
                    found = true;
                }
            }
            pos = pos + 1;
        }
        return instruccionesEtiqueta;
    }
    crearIfAnterior(unIf) {
        let cond = Object.create(unIf.condicion);
        let nuevoIf = new If3D(TipoInstruccion3D.IF, cond, unIf.gotoEtiqueta, unIf.codigo3D, unIf.fila, unIf.columna);
        return nuevoIf;
    }
    sonConstantes(izq, der) {
        if (izq.getTipoPrim3D() == TipoPrim3D.IDENTIFIER) {
            return false;
        }
        if (der != null) {
            if (der.getTipoPrim3D() == TipoPrim3D.IDENTIFIER) {
                return false;
            }
        }
        return true;
    }
}
