import { Component, OnInit } from '@angular/core';
import nodoAST from 'src/app/Backend/XPATH/Analizador/Abstracto/nodoAST';
import { parse } from 'ts-node';
import * as vis from 'vis';
@Component({
  selector: 'app-xpath-asc-ast',
  templateUrl: './xpath-asc-ast.component.html',
  styleUrls: ['./xpath-asc-ast.component.css']
})
export class XpathAscAstComponent implements OnInit {
  contador=1;
  cuerpo='';
  dataSource = '';
  nodes = null;
  edges = null;
  network = null;
  cadena="";
  directionInput = document.getElementById("direction");
  constructor() { }
  c = 0;

  ngOnInit(): void {
    
    this.nodes = [];
    this.edges = [];
    let info = window.localStorage.getItem('astpath');
    let contenido:nodoAST = <nodoAST>JSON.parse(info);
    
    /*this.cadena+=this.getValor(contenido)+"--"
    this.graficaAST(contenido)
    console.log(this.cadena)*/
    
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
            border: '#A72168',//Configuración de color del borde
            background:'#F695BB',
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

    graficaAST(nodo: nodoAST){
      
      for(let hijo of this.getHijos(nodo))
      {
        this.cadena+= this.getValor(hijo)+"->"
        this.graficaAST(hijo)
      }
      
    }
}
