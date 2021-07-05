import express from 'express';
import { Fila } from './Xml/Fila';
import { XmlResultado } from './Xml/XmlResultado';
import { SimbolsReport } from './Reportes/TablaSimbolos'
import { ControlError } from './Xpath/ControlError';
import { ReporteGramatica } from './Reportes/ReporteGramatica';

import fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
const parser = require('./Grammar/xmlA.js');
const parserXpath = require('./Grammar/xpathD.js');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.set('views', __dirname);
app.use(express.urlencoded());
app.use(express.json());



app.get('/Simbols', (req, res) => {
  const entrada = req.body.entrada;


  res.send("reporte creado con exito") 
 SimbolsReport.REPORTE()

  
});
app.get('/', (req, res) => {
  res.render('views/index', {
    entrada: '',
    consola: '',
    Xpath: '',
    errores: []
  });
}).get('/analizar', (req, res) => {
  res.render('views/index', {
    entrada: '',
    consola: '',
    Xpath: ''


  });
});

app.post('/analizar', (req, res) => {
  // aqui voy a vaciar antes que nada los nuevos simbolos
  SimbolsReport.aux = "";
  const { entrada, consola, Xpath } = req.body;
  if (!entrada) {
    return res.redirect('/');
  }

  const tree:XmlResultado = parser.parse(entrada)
  const resXpath:any = parserXpath.parse("//videojuego")
  console.log("Respuesta xpath:")
  console.log(JSON.stringify(resXpath, null, 2))
  console.log("\nResultado de busqueda:")
  console.log(tree.getAsTable().buscar(resXpath))
  //console.log(tree.getCstDotA())

  

   console.log(ReporteGramatica.Lista)
  
  /**aqui se llenara el reporte HTML de la tabla de simbolos  */
  tree.getAsTable().filas.forEach(fila => {
    //console.log(fila)


    SimbolsReport.aux += "<td>\n" + fila.nombre + "</td>" + "\n";

    SimbolsReport.aux += "<td>\n" + fila.tipo + "</td>" + "\n";

    SimbolsReport.aux += "<td>\n" + fila.listaAmbito.join("-") + "</td>" + "\n";

    SimbolsReport.aux += "<td>\n" + fila.fila + "</td>" + "\n";

    SimbolsReport.aux += "<td>\n" + fila.columna + "</td>" + "\n";
    SimbolsReport.aux += "<td>\n" + fila.valor + "</td>" + "\n";
    SimbolsReport.aux += "</tr>" + "\n";


  });





  /*  aqui termina el llenado de la tabla de simbolos **/




  console.log(tree.getErroresSemanticos())
  console.log(ControlError.ListaE)
  // console.log(Xpath)
  // console.log(tree.getCstDotA())
  res.render('views/index', {
    entrada,
    consola: tree
  });
});

app.listen(port, err => {
  return console.log(`server is listening on ${port}`);
});


