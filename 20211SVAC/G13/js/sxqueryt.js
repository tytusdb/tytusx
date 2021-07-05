function cambiarSalidaXQuery(arrSalida) {
    arrSalida.forEach(element => {
        document.getElementById('taResult').value += element + "\n"; 
    });
}

module.exports.cambiarSalidaXQuery = cambiarSalidaXQuery;