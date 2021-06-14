import { Component, OnInit } from '@angular/core';
import nodoAST from 'src/app/Backend/XML/Analizador/Abstracto/nodoAST';
import Objeto from 'src/app/Backend/XML/Analizador/Expresiones/Objeto';
import Simbolo from 'src/app/Backend/XPATH/Analizador/Simbolos/Simbolo';
import tablaSimbolos from 'src/app/Backend/XPATH/Analizador/Simbolos/tablaSimbolos';
import * as vis from 'vis';
@Component({
  selector: 'app-arbol-ast',
  templateUrl: './arbol-ast.component.html',
  styleUrls: ['./arbol-ast.component.css']
})

export class ArbolASTComponent implements OnInit {
  //**desde aqui vro */
  contador=1;
  cuerpo='';
  dataSource = '';
  nodes = null;
  edges = null;
  network = null;
  directionInput = document.getElementById("direction");
  constructor() { }
  c = 0;

  ngOnInit(): void {
    
    this.destroy();
    this.nodes = [];
    this.edges = [];
    var connectionCount = [];
    let info = window.localStorage.getItem('simbolos');
    let contenido:nodoAST = <nodoAST>JSON.parse(info);
    console.log(contenido)

    
    var nivel = 0;
    this.nodes.push({id: this.c, label: this.getValor(contenido), nivel:nivel})
    this.nodes[this.c]["level"]=nivel;
    var hijos = this.recorrerAST(this.c,contenido,nivel);
    console.log(hijos)
    for (let nodo of hijos.nodos){
      this.nodes.push({id: nodo.id, label: nodo.label})
    }
    for (let enlace of hijos.enlaces){
      this.edges.push({from: enlace.id1, to: enlace.id2})
    }
    for (let nodo of hijos.nodos){
      this.nodes[nodo.id]["level"]=nodo.nivel;
    }

   
    var container = document.getElementById("mynetwork");
    var data = {
      nodes: this.nodes,
      edges: this.edges,
    };

    var options = {
      nodes:{// Control de nodos
        borderWidth: 2,//Ajuste de ancho de borde de nodo
        size: 30,//Haga clic en la configuración de ancho cuando esté seleccionado,
        color: {
            border: '#46304E',//Configuración de color del borde
            background:'#D297E9',
        },
        font:{
          color:"#000000",
          face: 'Century Gothic'
          }
    },
      edges: {
        smooth: {
          type: "cubicBezier",
          forceDirection: "vertical",
          roundness: 0.4,
        }
      },
      layout: {
        randomSeed: undefined,
        improvedLayout:true,

        hierarchical: {
          
          direction: "UD",
          sortMethod: "hubsize"
        },
      },
      
      physics: false,
    };
    this.network = new vis.Network(container, data, options);

    this.network.on("select", function (params) {
      document.getElementById("selection").innerText =
        "Selection: " + params.nodes;
    });




    let registros:Objeto[] = [];
    
  
 
  }
  
  destroy() {
    if (this.network !== null) {
      this.network.destroy();
      this.network = null;
    }
  }
  recorrerAST(padre:number, nPadre:nodoAST, nivel:number)
    {
      var arr = {nodos:[],enlaces:[]}
      for(let hijo of this.getHijos(nPadre))
      {
        nivel++
        this.c++
        arr.enlaces.push({id1:padre, id2:this.c})
        arr.nodos.push({id:this.c, label:this.getValor(hijo), nivel:nivel})

        var resultado = this.recorrerAST(this.c,hijo,nivel);
        arr.enlaces = arr.enlaces.concat(resultado.enlaces);
        arr.nodos = arr.nodos.concat(resultado.nodos);
      }
      return arr
    }
    getValor(nodo): string {
      return nodo.valor;
    }
    getHijos(nodo): Array<nodoAST> {
      return nodo.listaNodos;
    }
}
