'use strict';

const init = function(e){

    var myArray = JSON.parse(localStorage.getItem('opJSON'));
	buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById('myTable')

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].fila}</td>
                            <td>${data[i].tipo}</td>
                            <td>${data[i].regla}</td>
							<td>${data[i].antes}</td>
							<td>${data[i].despues}</td>
					  </tr>`
			table.innerHTML += row


		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
