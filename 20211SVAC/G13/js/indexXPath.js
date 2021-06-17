"use strict";
var XPathAsc = require('./XPath');
var XPathDes = require('./XPathDesc');
var fs = require('fs');
var arbolXPath;
var countId = 0;

let leXpath = [];
module.exports.erroresXPath = leXpath;


function execAscendente(entrada, xmlObj) {
    xmlObj.pasarPadre();
    var arbolXml = xmlObj;
    
    //Ejecuto el parser del XPath
    arbolXPath = XPathAsc.parse(entrada);
    //Recorro el arbol XPath y ejecuto instrucciones
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

function removeDot(consulta) {
    while (consulta[0].valor == '.') {
        consulta.shift()
    }
}

function ejecutarRaiz(XML, XPATH){
    var respuestas = [];
    //
    XPATH.forEach((consulta) => {
        //var verif = ejecucionRecursiva(XML, consulta);
        removeDot(consulta);

        if(consulta[0].ambito == 'local') {
            if(XML.etiqueta_id == consulta[0].valor) {
                var auxConsulta = copiarConsultas(consulta);
                auxConsulta.shift();
    
                var verif = newRecursiva(XML, auxConsulta);
                if(verif != undefined && verif != '')
                    respuestas.push(verif);
            }
        } else {
            //Hacer busqueda india :v
        }
    });
    //

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
function newRecursiva(XML, consulta) { //XML = Posible Arreglo de objetos XML
    var resultadoIntermedio = [];

    if(Array.isArray(XML)) {
        //Recorrer y consultar
        XML.forEach((objXML) => {
            var ver = consultar(objXML, consulta[0]);
            if (ver != undefined || ver != null) {
                if(ver.length != 0) {
                    if(Array.isArray(ver)) {
                        ver.forEach((al) => {
                            resultadoIntermedio.push(al);    
                        });
                    } else {
                        resultadoIntermedio.push(ver);
                    }
                }
            }
        });
    } else {
        //Solo consultar
        var ver = consultar(XML, consulta[0]);
        if(ver != undefined || ver != null) { //cambiar a push y verificar que me devuelve >0
            if(Array.isArray(ver)) {
                if(ver.length > 0) {
                    ver.forEach((al) => {
                        resultadoIntermedio.push(al);    
                    });
                }
            } else {
                resultadoIntermedio.push(ver);  
            }
        }
    }

    var newConsulta = copiarConsultas(consulta);
    newConsulta.shift();

    var resultado = resultadoIntermedio;
    if(newConsulta.length != 0) {
        var resultado = newRecursiva(resultadoIntermedio, newConsulta);
    }

    return resultado;
}

function consultar(oXML, oXPath) {
    if(oXPath.ambito == 'local') {
        // Nodo Actual
        if(oXPath.valor == '.') {
            return oXML;
        } else if(oXPath.valor == '..') {
            //Verificar bien el flujo con el ..
            if(oXML.padre != undefined) {
                return oXML.padre;
            }
            return;
        }

        //Nodos desconocidos
        if(oXPath.valor == '*') {
            //verificar si es * o @*
        } else if(oXPath.valor == 'node()') {
            //Devolver todos los nodos :v
        }
        
        //Atributos
        if(oXPath.atributo == true) {
            // Recorrer lista de atributos
        } else {
            var resAux = [];
            
            //Verificar si tiene predicado
            if(oXPath.exp != undefined) {
                //Buscar en la lista de nodos del padre lo que diga el predicado
                //Verificar si quiere buscar nodo en x posicion, algun atributo o mas
                //if(oXML.padre != undefined) {
                    oXML.lista_objetos.forEach((obH) => {
                        if(obH.etiqueta_id == oXPath.valor) {
                            resAux.push(obH);
                        }
                    });

                    
                    var expVal = oXPath.exp.getValor();
                    if(expVal == 0 || expVal.tipo == 1) {
                        var oTmp = resAux[expVal.valor];
                        if(oTmp != undefined) {
                            return oTmp;
                        }
                    }
                //}
            } else {
                // Recorrer lista de nodos
                oXML.lista_objetos.forEach((obH) => {
                    if(obH.etiqueta_id == oXPath.valor) {
                        resAux.push(obH);
                    }
                });
                return resAux;
            }
        }
    } else if (oXPath.ambito == 'full') {
        console.log('consulta hardcore');
    }
}

function ejecucionRecursiva(XML, consulta) {
    var res = [];

    if(consulta[0].ambito == 'local') {
        if(consulta[0].valor == '.') {
            var auxConsulta = copiarConsultas(consulta);
            auxConsulta.shift();
            return ejecucionRecursiva(XML, auxConsulta);
        }

        if(consulta[0].valor == '*') {

        } else if(consulta[0].valor == 'node()') {

        }

        if(consulta[0].atributo == true) {
            //Verificar y recorrer para @*, @id
        } else if(consulta[0].valor == XML.etiqueta_id) {
            var tmpConsulta = copiarConsultas(consulta);
            tmpConsulta.shift();
            if(tmpConsulta.length == 0) {
                //Resolver
                //delete XML['nodo'];
                return XML;
            } else {
                if (tmpConsulta[0].exp != undefined) {
                    var resAux = [];
                    XML.lista_objetos.forEach((obj) => {
                        if(obj.etiqueta_id == tmpConsulta[0].valor) {
                            resAux.push(obj);
                        }
                    });

                    var expVal = tmpConsulta[0].exp.getValor(); //Verificar tipos??
                    if(expVal.tipo == 0 || expVal.tipo == 1) {
                        var oTmp = resAux[expVal.valor];
                        if(oTmp != undefined) {
                            res = [];
                            res.push(oTmp);
                        }
                    } else { //Verificar si es arreglo? 

                    }
                } else {
                    XML.lista_objetos.forEach((o) => {
                        var tmp = ejecucionRecursiva(o, tmpConsulta); 
                        if(tmp != '') {
                            res.push(tmp);
                        }
                    });
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
function copiarConsultas (lConsultas) {
    var aux = [];
    lConsultas.forEach((consulta) => {
        aux.push(consulta.copiarValor());
    })

    return aux;
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
module.exports.aJson = aJson;

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