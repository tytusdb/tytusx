"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporteGramatical = void 0;
class ReporteGramatical{
    constructor(){
        this.arreglo_elementos = [];
    }

    limpiar_Arreglo(){
        this.arreglo_elementos = [];
    }

    agregar_Elemento(produccion,reglaGramatical){

        var item = {
            "Produccion": produccion,
            "Regla_": reglaGramatical,
    }

        this.arreglo_elementos.push(item);
    }

    buildTable(data){
		var table = "";

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].Produccion}</td>
                            <td>${data[i].Regla}</td>
					  </tr>`;
			table.innerHTML += row;


		}
	}
}
exports.ReporteGramatical = ReporteGramatical;