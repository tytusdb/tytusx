"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporteXML = void 0;
class ReporteXML {
    tablaSimbolos(entornoGlobal) {
        //console.log(entornoGlobal.getActual().id)
        for (let key in entornoGlobal.getTabla()) {
            console.log(entornoGlobal.getSimbolo(key).id);
            let siguienteEntorno = entornoGlobal.getSimbolo(key).getValorImplicito().entorno;
            if (siguienteEntorno != null) {
                this.tablaSimbolos(siguienteEntorno);
            }
        }
    }
}
exports.ReporteXML = ReporteXML;
