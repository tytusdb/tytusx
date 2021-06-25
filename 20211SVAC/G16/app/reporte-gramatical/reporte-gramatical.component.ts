import { Component, OnInit } from '@angular/core';
const ListaGramatica=require('../Clases/Models/ListaGramatica.js')
import { Router } from '@angular/router';
@Component({
  selector: 'app-reporte-gramatical',
  templateUrl: './reporte-gramatical.component.html',
  styleUrls: ['./reporte-gramatical.component.css']
})
export class ReporteGramaticalComponent implements OnInit {

  constructor(private router: Router) { }
  lista=[];
  
  ngOnInit(): void {
    if(ListaGramatica.ReporteGramatical.getGramatica().length>0){
      for (let i=ListaGramatica.ReporteGramatical.getGramatica().length; i > 0; i--){
        this.lista.push(ListaGramatica.ReporteGramatical.getGramatica()[i-1])
      }
    }
  }


  ReporteGram(){
    this.router.navigate(['./gramatical']);
  }

  repoSimbolos(){
    this.router.navigate(['./tablasimbolos']);
  }
  regresar(){
    localStorage.clear();
    this.router.navigate(['./inicio']);
  }

  cstASC() {
    this.router.navigate(['./cstASC']);
  }

}
