'use strict';

const init = function(e){

    var myArray = JSON.parse(localStorage.getItem('stackJSON'));
	buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById('myTable')

		for (var i = 0; i < data.length; i++){
			var row = `<tr>
							<td>${i.toString()}</td>
                            <td>${data[i].toString()}</td>
					  </tr>`
			table.innerHTML += row


		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
    init();});