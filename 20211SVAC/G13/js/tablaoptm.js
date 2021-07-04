
function llenatTableOptm1(arrOptm) {
    let tbodyRef = document.getElementById('optmTabla').getElementsByTagName('tbody')[0];

    let rows = '';
    let contador = 1;

    arrOptm.forEach(element => {
        let newRow = tbodyRef.insertRow(tbodyRef.rows.length);

        rows = `<tr>
                    <td>${ contador }</td>
                    <td>${ element.linea }</td>
                    <td>${ element.regla }</td>
                    <td>${ element.eliminado }</td>
                    <td>${ element.agregado }</td>
                </tr>`;

        newRow.innerHTML = rows;
        contador++;
    });
}

module.exports.llenatTableOptm1 = llenatTableOptm1;