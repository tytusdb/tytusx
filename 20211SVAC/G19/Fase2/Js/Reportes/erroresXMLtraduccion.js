'use strict';

const init = function(e){

    var myArray = JSON.parse(localStorage.getItem('errJSON'));
	buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById('myTable')

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].No}</td>
                            <td>${data[i].Tipo}</td>
                            <td>Error al traducir ${data[i].Descripcion} no se pudo generar C3D del token </td>
                            <td>${data[i].Gramatica}</td>
					  </tr>`
			table.innerHTML += row


		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
