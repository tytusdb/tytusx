"use strict";
var XPathAsc = require('../src/XPath');
var XPathDes = require('../src/XPathDesc');
var fs = require('fs');
var arbolXPath;
var countId = 0;

let leXpath = [];
module.exports.erroresXPath = leXpath;


function execAscendente(entrada, xmlObj) {
    var arbolXml = xmlObj;
    arbolXPath = XPathAsc.parse(entrada);
    
    //var ast = aJson(arbolXPath);
    //console.log(JSON.stringify(ast));
    
    //console.log(leXpath);
    var resultado = ejecutarRaiz(arbolXml, arbolXPath);

    return resultado;
}

module.exports.execAscendente = execAscendente;

function execDescendente(entrada) {
    console.log('\n========== DESCENDENTE ==========');

    var XMLtxt = fs.readFileSync('../src/simp.xml');
    var obXML = XmlDsc.parse(XMLtxt.toString());
    var arbolXml = obXML[0];
    
    var arbolXPath = XPathDes.parse(entrada);
    var resultado = ejecutarRaiz(arbolXml, arbolXPath);
    
    console.log("\n"+resultado);
}

function ejecutarRaiz(XML, XPATH){
    var respuestas = [];
    XPATH.forEach((consulta) => {
        var verif = ejecucionRecursiva(XML, consulta);
        if(verif != undefined && verif != '')
            respuestas.push(verif);
    });

    var texto = '';
    if(respuestas.length > 0) {
        texto += printRespuestas(respuestas[0]);
        respuestas.shift();
        respuestas.forEach((respuesta) => {
            texto += '\n' + printRespuestas(respuesta);
        });
    }
    
    return texto;
}
function ejecucionRecursiva(XML, consulta, cadena) {
    var res = [];
    var expr;

    if(consulta[0].exp != undefined) {
        //expr = consulta[0].exp.getValor();
        //console.log(typeof(consulta[0].exp));
    }

    if(consulta[0].ambito == 'local') {
        if(consulta[0].valor == '.') {
            var auxConsulta = JSON.parse(JSON.stringify(consulta));
            auxConsulta.shift();
            return ejecucionRecursiva(XML, auxConsulta);
        }

        if(consulta[0].valor == '*') {

        } else if(consulta[0].valor == 'node()') {

        }

        if(consulta[0].atributo == true) {
            //Verificar y recorrer para @*, @id
        } else if(consulta[0].valor == XML.etiqueta_id) {
            var tmpConsulta = JSON.parse(JSON.stringify(consulta));
            tmpConsulta.shift();
            if(tmpConsulta.length == 0) {
                //Resolver
                //delete XML['nodo'];
                return XML;
            } else {
                XML.lista_objetos.forEach((o) => {
                    var tmp = ejecucionRecursiva(o, tmpConsulta); 
                    if(tmp != '') {
                        res.push(tmp);
                    }
                });
                if (tmpConsulta[0].exp != undefined) {
                    var oTmp = res[tmpConsulta[0].exp.valor];
                    if(oTmp != undefined) {
                        res = [];
                        res.push(oTmp);
                    }
                }
            }
        }
    } else if(consulta[0].ambito == 'full') {
        console.log('FULL');
        if(consulta[0].valor == '.') {
            console.log('\t> cosa hardcore');
        }
    }
    return res;
}
function seguirFull(XML, consulta){
}
function getFull(XML,consulta) {
}
function printRespuestas(respuesta) {
    var txt = '';
    respuesta.forEach((oXML) => {
        if(Array.isArray(oXML) == true) {
            txt += printRespuestas(oXML);
        } else  {
            txt += getContenido(oXML) + '\n';
        }
    });

    return txt;
}
function getContenido(XML) {
    var att = '';
    if(XML.lista_atributos !== undefined) {
        if(XML.lista_atributos.length != 0) {
            XML.lista_atributos.forEach((at) => {
                att += ` ${at.atributo}=${at.contenido}`;
            });
        }
    }

    var tmp;
    if(XML.tipo == 0) { //<></>
        //Verificar objetos internos
        var cnt = XML.contenido;
        if(XML.lista_objetos !== undefined) {
            if(XML.lista_objetos.length != 0) {
                cnt = ' ';
                XML.lista_objetos.forEach((hj) => {
                    cnt += getContenido(hj);
                });
            }
        }

        tmp = `<${XML.etiqueta_id}${att}>${cnt}</${XML.etiqueta_id}> `; 
    } else { //Solo </>
        tmp = `<${XML.etiqueta_id}${att}/> `;
    }

    return tmp;
}

function aJson() {
    var ast = {};
    var lista_consultas = [];
    
    arbolXPath.forEach(function (ec) {
        var consulta = [];
        ec.forEach(function (acc) {
            var tmpA = {}
            var tmpV = {}
            if (acc.ambito == 'full') {
                tmpA = {ambito: '//', id: countId};
                countId ++;
            }
            else {
                tmpA = {ambito: '/', id: countId};
                countId ++;
            }
            tmpV = {valor: acc.valor, id: countId}
            countId ++;

            if(acc.exp != undefined) {
                var pred = {}
                pred = obtenerValor(acc.exp);
                
                consulta.push({ acceso: {ambito: tmpA,valor: tmpV,id: countId, predicado: pred} });
                countId ++;
            } else {
                consulta.push({ acceso: {ambito: tmpA,valor: tmpV,id: countId} });
                countId ++;
            }
        });
        lista_consultas.push({ consulta: consulta, id: countId });
        countId ++;
    });
    ast.lista_consultas = lista_consultas;
    ast.id = countId;
    countId ++;

    return ast;
}
function obtenerValor(Exp) {
    var E = {}
    if(Exp.operacion != undefined) {
        E.valor = Exp.operacion;
        E.id = countId;
        countId++;

        E.izq = obtenerValor(Exp.hI);
        E.der = obtenerValor(Exp.hD);
    } else {
        E.valor = Exp.valor;
        E.id = countId++;
    }
    return E;
}

module.exports.aJson = aJson;
function deleteNod(respuesta){
    respuesta.forEach((oXML) => {
        delete oXML['nodo'];
        if(oXML.lista_objetos != undefined)
            deleteNod(oXML.lista_objetos);
    });
}