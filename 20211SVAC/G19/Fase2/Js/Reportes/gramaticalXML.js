'use strict';

const init = function(e){

    var myArray = JSON.parse(localStorage.getItem('rgJSON'));
	buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById('myTable')

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${data[i].Produccion}</td>
                            <td>${data[i].Regla}</td>
					  </tr>`
			table.innerHTML += row


		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
    init();});