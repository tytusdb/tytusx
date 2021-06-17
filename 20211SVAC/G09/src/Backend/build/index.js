"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TablaSimbolos_1 = require("./Reportes/TablaSimbolos");
const ControlError_1 = require("./Xpath/ControlError");
const ReporteGramatica_1 = require("./Reportes/ReporteGramatica");
const cors = require('cors');
const app = express_1.default();
const port = 3000;
app.use(cors());
const parser = require('./Grammar/xmlD.js');
const parserXpath = require('./Grammar/xpathD.js');
app.use(express_1.default.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.get('/Simbols', (req, res) => {
    const entrada = req.body.entrada;
    res.send("reporte creado con exito");
    TablaSimbolos_1.SimbolsReport.REPORTE();
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
    TablaSimbolos_1.SimbolsReport.aux = "";
    const { entrada, consola, Xpath } = req.body;
    if (!entrada) {
        return res.redirect('/');
    }
    const tree = parser.parse(entrada);
    const resXpath = parserXpath.parse("//videojuego");
    console.log("Respuesta xpath:");
    console.log(JSON.stringify(resXpath, null, 2));
    console.log("\nResultado de busqueda:");
    console.log(tree.getAsTable().buscar(resXpath));
    //console.log(tree.getCstDotA())
    console.log(ReporteGramatica_1.ReporteGramatica.Lista);
    /**aqui se llenara el reporte HTML de la tabla de simbolos  */
    tree.getAsTable().filas.forEach(fila => {
        //console.log(fila)
        TablaSimbolos_1.SimbolsReport.aux += "<td>\n" + fila.nombre + "</td>" + "\n";
        TablaSimbolos_1.SimbolsReport.aux += "<td>\n" + fila.tipo + "</td>" + "\n";
        TablaSimbolos_1.SimbolsReport.aux += "<td>\n" + fila.listaAmbito.join("-") + "</td>" + "\n";
        TablaSimbolos_1.SimbolsReport.aux += "<td>\n" + fila.fila + "</td>" + "\n";
        TablaSimbolos_1.SimbolsReport.aux += "<td>\n" + fila.columna + "</td>" + "\n";
        TablaSimbolos_1.SimbolsReport.aux += "<td>\n" + fila.valor + "</td>" + "\n";
        TablaSimbolos_1.SimbolsReport.aux += "</tr>" + "\n";
    });
    /*  aqui termina el llenado de la tabla de simbolos **/
    console.log(tree.getErroresSemanticos());
    console.log(ControlError_1.ControlError.ListaE);
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
