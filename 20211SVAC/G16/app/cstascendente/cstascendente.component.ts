import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Nodo from '../Clases/Models/Nodo';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'app-cstascendente',
  templateUrl: './cstascendente.component.html',
  styleUrls: ['./cstascendente.component.css']
})
export class CstascendenteComponent implements OnInit {

  nodoraiz:Nodo;
  public nodes: Node;
  public edges: Edge;
  public network : Network;
  listanodes=[];
  listaedges=[];
  contgrafica:number=0;
  nodohoja:number =0;
  switchversion=0;// como se sabe que vendra version de primero para que solo una vez genere un ++ mas
  tiporeporte:string="";
  constructor(private router:Router, public toast:ToastrService) { }

  ngOnInit(): void {
      this.tiporeporte=localStorage.getItem("TIPO")
      this.nodoraiz=JSON.parse(localStorage.getItem("CSTA"));
      console.log(this.nodoraiz)
      try{
        if (this.nodoraiz!=null || this.nodoraiz!= undefined){
          this.Graficar(this.nodoraiz);
        }
      }catch{
        this.toast.error("No se pudo generar el CST")
      }
      
  }

  repoSimbolos(){
  this.router.navigate(['./tablasimbolos']);
  }
  regresar(){
    this.router.navigate(['./inicio']);
  }

  cstASC(){
    this.router.navigate(['./cstASC']);
  }
  Graficar(raiz:Nodo){
    this.listaedges=[];
    this.listanodes=[];
    this.contgrafica=0;
    this.RecorrerCST(raiz)
  var nodes = new DataSet(this.listanodes);
  var edges = new DataSet(this.listaedges);
  var container = document.getElementById('visualizar');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    layout: {
      randomSeed: undefined,
      improvedLayout:true,
      hierarchical: {
      enabled:true
    }
  }
  };
  var network = new Network(container, data, options);
  }

  RecorrerCST(raiz:Nodo){
    //Agregando el nodo padre
    let nodo = {
      id: 0,
      label: raiz.Etiqueta
    }
    this.listanodes.push(nodo);
    if (raiz.Hijos.length!=0){
        this.RecorrerHijos(raiz.Hijos, 0)
    }
  }

  RecorrerHijos(hijos:Array<Nodo>, idpadre:number){
  for(let i=0; i<hijos.length; i++){
      //VERIFICA SI EL ID YA ESTÁ USADO.
      if(this.switchversion==1){
        this.nodohoja++;
      }
      this.switchversion++;
      
      let hijo = this.nodohoja + 1;
      //console.log("Su id es: "+hijo)
      if (this.VerificarID(hijo)==false){
        let nodo = {
          id: hijo,
          label: hijos[i].Etiqueta + "\n"+ hijos[i].Valor
        }
        this.listanodes.push(nodo);
      }
      //CREA LA RELACIÓN PADRE E HIJO
      let edge = {
        from: idpadre,
        to: hijo
      }
      this.listaedges.push(edge);
      //VE SI ESTE HIJO TIENE HIJOS
      if(hijos[i].Hijos.length>0){
        this.nodohoja=hijo;
        //console.log("La etiqueta: "+ hijos[i].Etiqueta + " Tiene "+ hijos[i].Hijos.length + " hijos.")
        this.RecorrerHijos( hijos[i].Hijos, hijo);
      }else{//SI NO TIENE ES UN NUEVO NODO HOJA Y SE DEBE DE ACTUALIZAR.
        this.nodohoja=hijo;
      }
    }
  }

  VerificarID(padre:number):boolean{
    for (let i=0; i<this.listanodes.length; i++) {
      if(this.listanodes[i].id==padre){
        return true;
      }
    }
    return false;
  }
}
