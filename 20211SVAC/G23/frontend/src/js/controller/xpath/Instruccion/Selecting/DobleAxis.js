"use strict";
// import { Ambito } from "../../../../model/xml/Ambito/Ambito";
// import { Tipos } from "../../../../model/xpath/Enum";
// import { Element } from "../../../../model/xml/Element";
// import { Atributo } from "../../../../model/xml/Atributo";
// import { Predicate } from "./Predicate";
// function getAllAxis(_axisname: Tipos, _nodetest: any, _predicate: any, _contexto: any, _ambito: Ambito): any {
//     if (_contexto)
//         return firstFiler(_axisname, _nodetest, _predicate, _contexto, _ambito);
//     else
//         return { error: "Indstrucción no procesada.", tipo: "Semántico", origen: "Query", linea: 1, columna: 1 };
// }
// // Revisa el axisname y extrae los elementos
// function firstFiler(_axisname: Tipos, _nodetest: any, _predicate: any, _contexto: any, _ambito: Ambito): any {
//     let elements = Array<Element>();
//     let attributes = Array<Atributo>();
//     let cadena: Tipos = Tipos.ELEMENTOS;
//     switch (_axisname) {
//         case Tipos.AXIS_ANCESTOR: // Selects all ancestors (parent, grandparent, etc.) of the current node
//         case Tipos.AXIS_ANCESTOR_OR_SELF: // Selects all ancestors (parent, grandparent, etc.) of the current node and the current node itself
//             for (let i = 0; i < _contexto.length; i++) {
//                 const element = _contexto[i];
//                 if (_axisname === Tipos.AXIS_ANCESTOR_OR_SELF) elements.push(element);
//                 let dad = element.father;
//                 if (dad) {
//                     elements = _ambito.compareCurrent(element, elements, _axisname);
//                 }
//             }
//             break;
//         case Tipos.AXIS_ATTRIBUTE: // Selects all attributes of the current node
//             for (let i = 0; i < _contexto.elementos.length; i++) {
//                 const element = _contexto.elementos[i];
//                 attributes = _ambito.searchAnyAttributes(_id.id, element, attributes);
//             }
//             for (let i = 0; i < _contexto.length; i++) {
//                 const element = _contexto[i];
//                 if (element.attributes)
//                     element.attributes.forEach((attribute: Atributo) => {
//                         attributes.push(attribute);
//                     });
//             }
//             cadena = Tipos.ATRIBUTOS;
//             break;
//         case Tipos.AXIS_CHILD: // Selects all children of the current node
//             for (let i = 0; i < _contexto.length; i++) {
//                 const element = _contexto[i];
//                 if (element.childs)
//                     element.childs.forEach((child: Element) => {
//                         elements.push(child);
//                     });
//             }
//             break;
//         case Tipos.AXIS_DESCENDANT: // Selects all descendants (children, grandchildren, etc.) of the current node
//         case Tipos.AXIS_DESCENDANT_OR_SELF: // Selects all descendants (children, grandchildren, etc.) of the current node and the current node itself
//             for (let i = 0; i < _contexto.length; i++) {
//                 const element = _contexto[i];
//                 if (_axisname === Tipos.AXIS_DESCENDANT_OR_SELF) elements.push(element);
//                 if (element.childs)
//                     element.childs.forEach((child: Element) => {
//                         elements = _ambito.searchNodes("*", child, elements);
//                     });
//             }
//             break;
//         case Tipos.AXIS_FOLLOWING: // Selects everything in the document after the closing tag of the current node
//         case Tipos.AXIS_PRECEDING: // Selects all nodes that appear before the current node in the document
//         case Tipos.AXIS_FOLLOWING_SIBLING: // Selects all siblings after the current node:
//         case Tipos.AXIS_PRECEDING_SIBLING: // Selects all siblings before the current node
//             for (let i = 0; i < _contexto.length; i++) {
//                 const element = _contexto[i];
//                 let dad = element.father;
//                 if (dad && (_axisname === Tipos.AXIS_PRECEDING || _axisname === Tipos.AXIS_PRECEDING_SIBLING)) {
//                     elements = _ambito.compareCurrent(element, elements, _axisname);
//                 }
//                 else if (_axisname === Tipos.AXIS_FOLLOWING || _axisname === Tipos.AXIS_FOLLOWING_SIBLING) {
//                     elements = _ambito.compareCurrent(element, elements, _axisname);
//                 }
//             }
//             break;
//         case Tipos.AXIS_NAMESPACE: // Selects all namespace nodes of the current node
//             return { error: "Error: la funcionalidad 'namespace' no está disponible.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
//         case Tipos.AXIS_PARENT: // Selects the parent of the current node
//             for (let i = 0; i < _contexto.length; i++) {
//                 const element = _contexto[i];
//                 let dad = element.father;
//                 if (dad)
//                     _ambito.tablaSimbolos.forEach(elm => {
//                         if (elm.id_open === dad.id && elm.line == dad.line && elm.column == dad.column)
//                             elements.push(elm);
//                         if (elm.childs)
//                             elm.childs.forEach(child => {
//                                 elements = _ambito.searchDad(child, dad.id, dad.line, dad.column, elements);
//                             });
//                     });
//             }
//             break;
//         case Tipos.AXIS_SELF: // Selects the current node
//             for (let i = 0; i < _contexto.length; i++) {
//                 const element = _contexto[i];
//                 elements.push(element);
//             }
//             break;
//         default:
//             return { error: "Error: axisname no válido.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
//     }
//     return secondFilter(elements, attributes, _nodetest, _predicate, cadena, _ambito);
// }
// // Revisa el nodetest y busca hacer match
// function secondFilter(_elements: Array<Element>, _atributos: Array<Atributo>, _nodetest: any, _predicate: any, _cadena: Tipos, _ambito: Ambito) {
//     let elements = Array<Element>();
//     let attributes = Array<Atributo>();
//     let text = Array<string>();
//     let valor = _nodetest.valor;
//     switch (_nodetest.tipo) {
//         case Tipos.ELEMENTOS:
//         case Tipos.ASTERISCO:
//         case Tipos.FUNCION_TEXT:
//             for (let i = 0; i < _elements.length; i++) {
//                 const element = _elements[i];
//                 if (_nodetest.tipo === Tipos.FUNCION_TEXT && element.value) {
//                     text.push(element.value);
//                     elements.push(element);
//                     _cadena = Tipos.TEXTOS;
//                 }
//                 else if (_atributos.length > 0) {
//                     if (element.attributes) {
//                         for (let j = 0; j < element.attributes.length; j++) {
//                             const attribute = element.attributes[j];
//                             if (attribute.id == valor || valor === "*") {
//                                 elements.push(element);
//                                 attributes.push(attribute);
//                                 break; // Sale del ciclo de atributos para pasar al siguiente elemento
//                             }
//                             if (attribute.value == valor) {
//                                 elements.push(element);
//                                 attributes.push(attribute);
//                                 break;
//                             }
//                         }
//                     }
//                 }
//                 else if (element.id_open == valor || valor == "*") {
//                     if (_nodetest.tipo === Tipos.FUNCION_TEXT)
//                         text.push(element.value);
//                     elements.push(element);
//                 }
//                 else if (element.value == valor || valor == "*") {
//                     if (_nodetest.tipo === Tipos.FUNCION_TEXT)
//                         text.push(element.value);
//                     elements.push(element);
//                 }
//             }
//             break;
//         default:
//             return { error: "Error: nodetest no válido.", tipo: "Semántico", origen: "Query", linea: _nodetest.linea, columna: _nodetest.columna };
//     }
//     if (_predicate)
//         elements = thirdFilter(elements, attributes, _predicate, _ambito);
//     return { elementos: elements, atributos: attributes, texto: text, cadena: _cadena };
// }
// // En caso de tener algún predicado
// function thirdFilter(_elements: Array<Element>, _atributos: Array<Atributo>, _predicate: any, _ambito: Ambito) {
//     let filter = new Predicate(_predicate, _ambito, _elements);
//     _elements = filter.filterElements(_elements);
//     return _elements;
// }
// export =  getAllAxis;
