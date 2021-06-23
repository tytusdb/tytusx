'use strict';

const init = function(e){

    var myArray = JSON.parse(localStorage.getItem('heapJSON'));
	buildTable(myArray)



	function buildTable(data){
		var table = document.getElementById('myTable')

		for (var i = 0; i < data.length; i++){


			if(data[i]>0){

				var row = `<tr>
							<td>${i.toString()}</td>
                            <td>${String.fromCharCode(data[i])}</td>
					  </tr>`
				table.innerHTML += row

			} else {
				
				var row = `<tr>
							<td>${i.toString()}</td>
                            <td>${data[i]}</td>
					  </tr>`
				table.innerHTML += row
			}
	
		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
    init();});
