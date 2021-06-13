"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporteXML = void 0;
class ReporteXML {
    constructor() {
        this.reporteTabla = `
        <table style="table {
            border-collapse: separate;
          }">
            <tr>
            <td>Nombre</td>
            <td>Tipo</td>
            <td>Ambito</td>
            <td>Fila</td>
            <td>Columna</td>
            </tr>
            
        
        `;
    }
    tablaSimbolos(entornoGlobal, keyAnterior) {
        //console.log(entornoGlobal.getActual().id)
        for (let key in entornoGlobal.getTabla()) {
            this.reporteTabla += `
                <tr>
                    <td>${entornoGlobal.getSimbolo(key).id}</td>
                `;
            if (entornoGlobal.getSimbolo(key).tipo == 1) {
                this.reporteTabla += `
                    <td>Objeto</td>
                `;
            }
            else {
                this.reporteTabla += `
                    <td>Atributo</td>
                `;
            }
            if (entornoGlobal.getAnterior() != null) {
                if (entornoGlobal.getAnterior().getSimbolo(keyAnterior) != null) {
                    this.reporteTabla += `
                        <td>${entornoGlobal.getAnterior().getSimbolo(keyAnterior).id}</td>
                    `;
                }
                else {
                    this.reporteTabla += `
                        <td>    </td>
                    `;
                }
            }
            else {
                this.reporteTabla += `
                    <td>${" "}</td>
                `;
            }
            this.reporteTabla += `
                    <td>${entornoGlobal.getSimbolo(key).line}</td>
                    <td>${entornoGlobal.getSimbolo(key).column}</td>
                </tr>
            `;
            let siguienteEntorno = entornoGlobal.getSimbolo(key).getValorImplicito().entorno;
            if (siguienteEntorno != null) {
                keyAnterior = key;
                this.tablaSimbolos(siguienteEntorno, keyAnterior);
            }
        }
        return this.reporteTabla;
    }
}
exports.ReporteXML = ReporteXML;
