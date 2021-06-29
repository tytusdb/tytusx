
var erroresGramar = [];
var reglas = [];
var ASTtree = '';
var CSTtree = '';
var reglasxpath = [];


var tablaErroresDesc = '';
var tablaGramatical = '';
function AnalizarXMLasc() {
  var text = null;
  text = editor.getValue();
  if (text.length > 0) {
    var objetos = gramarxml.getParser().parse(text);
    if (gramarxmldes.errores.length > 0) {
      alert("This browser does not support desktop notification");
    }
  }
}

function reiniciarArreglos() {
  erroresGramar[0] = [];
  erroresGramar[1] = [];
  erroresGramar[2] = [];
  reglas = [];
  reglasxpath=[];
}


class DefError {
  static sumarArray(arrayValores) {
    let suma = 0;
    for (let valor of arrayValores) {
      suma += valor
    }
    return suma;
  }
}

function llenarArboles() {
  var cst = document.getElementById('arbolcst');
  var ast = document.getElementById('arbolast');

  cst.value = CSTtree;
  ast.value =  ASTtree;
}

function llenarTablaErrores() {
  console.log('llenando Errores');
  if (erroresGramar != undefined) {
    var cuerpo = llenarTablas(erroresGramar);
    //console.log(cuerpo);
    /* var divTabla1 = document.getElementById('divTablaErrores');
     if (divTabla1 != null)
         divTabla1.innerHTML = cuerpo;*/
    var erroresd = document.getElementById('tabErrores');
    tablaErroresDesc = cuerpo;
    erroresd.value = cuerpo;
    //console.log(erroresd.value);
    return cuerpo;
  }
}

// ===========LLENANDO TABLA GRAMATICAL================
function llenarTablaGramatical() {
  var cuerpo = '';
  cuerpo = cuerpo + '<h1> REGLAS GRAMATICALES </h1>\n';
  if(reglas.length >0){
    var encabezado = '<h2>REGLAS XML</h2>' +
      '<table class=table table-bordered> ' +
      '<thead class=thead-dark>' +
      '<th scope = col > PRODUCCION </ th >' +
      '<th scope = col> REGLA </ th > ' +
      '</tr > </thead > <tbody>';
    cuerpo = cuerpo + encabezado;
    for (var i = 0; i < reglas.length; i++) {

      cuerpo = cuerpo +
        '<tr> ' +
        '<td> ' + reglas[i].getProduccion() + ' </td >\n' +
        '<td> ' + reglas[i].getReglaSemantica() + ' </td >\n' +
        '</tr> ';

    }
    cuerpo = cuerpo + '</tbody>\n</table>\n<br/> \n <br/>';
  }
  
  if (reglasxpath.length > 0) {
    var encabezado3 = '<br><br> <h2>REGLAS XPATH</h2>' +
      '<table class=table table-bordered> ' +
      '<thead class=thead-dark>' +
      '<th scope = col > PRODUCCION </ th >' +
      '<th scope = col> REGLA </ th > ' +
      '</tr > </thead > <tbody>';
    cuerpo = cuerpo + encabezado3;
    for (var i = 0; i < reglasxpath.length; i++) {

      cuerpo = cuerpo +
        '<tr> ' +
        '<td> ' + reglasxpath[i].getProduccion() + ' </td >\n' +
        '<td> ' + reglasxpath[i].getReglaSemantica() + ' </td >\n' +
        '</tr> ';
    }
    cuerpo = cuerpo + '</tbody>\n</table>\n<br/> \n <br/>';
  }


 
  var gramatical = document.getElementById('gramaticaltb');
  tablaGramatical = cuerpo;
  gramatical.value = cuerpo;
  console.log(gramatical.value);
}

//==========LLENANDO TABLA ERRORES==============

function llenarTablas(erroresEntero) {
  var cuerpo = '';
  console.log(erroresEntero.length);
  for (j = 0; j < erroresEntero.length; j++) {
    if (j == 0) {
      cuerpo = cuerpo + '<h1> Errores Lexicos</h1>\n';
    } else if (j == 1) {
      cuerpo = cuerpo + '<h1> Errores Sintacticos</h1>\n';
    } else {
      cuerpo = cuerpo + '<h1> Errores Semanticos</h1>\n<br/>\n';
    }
    var erroresGM = erroresEntero[j];
    console.log(erroresGM.length + '==== ' + j);
    var encabezado = '' +
      '<table class=table table-bordered> ' +
      '<thead class=thead-dark>' +
      ' <tr><th scope = col >TIPO</th>' +
      '<th scope = col > LEXEMA </ th >' +
      '<th scope = col> LINEA </ th > ' +
      '<th scope = col> COLUMNA </ th > ' +
      '</tr > </thead > <tbody>';
    cuerpo = cuerpo + encabezado;
    for (var i = 0; i < erroresGM.length; i++) {
      if (erroresGM[i].getLexema().length > 0) {
        cuerpo = cuerpo +
          '<tr> ' +
          '<td> ' + erroresGM[i].getTipo() + '</td > \n' +
          '<td> ' + erroresGM[i].getLexema() + ' </td >\n' +
          '<td> ' + erroresGM[i].getLinea() + ' </td >\n' +
          '<td> ' + erroresGM[i].getColumna() + ' </td >\n' +
          '</tr> ';
      }
    }
    cuerpo = cuerpo + '</tbody>\n</table>\n<br/> \n <br/>';
  }
  return cuerpo;
}
