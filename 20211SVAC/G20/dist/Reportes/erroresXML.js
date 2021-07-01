'use strict';

const init = function(e){

    var myArray = JSON.parse(localStorage.getItem('errJSON'));
	buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById('myTable')

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].No}</td>
							<td>${data[i].Fila}</td>
							<td>${data[i].Columna}</td>
                            <td>${data[i].Tipo}</td>
                            <td>${data[i].Descripcion}</td>
                            <td>${data[i].Gramatica}</td>
					  </tr>`
			table.innerHTML += row


		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
