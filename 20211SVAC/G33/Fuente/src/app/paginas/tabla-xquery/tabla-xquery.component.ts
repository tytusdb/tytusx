import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-xquery',
  templateUrl: './tabla-xquery.component.html',
  styleUrls: ['./tabla-xquery.component.css']
})
export class TablaXqueryComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'valor', 'fila', 'columna'];
  simbolos: any;

constructor() {this.simbolos = localStorage.getItem('tablaXquery'); }

  ngOnInit(): void {
    this.simbolos = JSON.parse(this.simbolos);
    for (let i = 0; i < this.simbolos.length; i ++){
      if(this.simbolos[i].tipo.tipo == 0){
        this.simbolos[i].tipo.tipo = "Entero"
      }else if(this.simbolos[i].tipo.tipo == 1) {
        this.simbolos[i].tipo.tipo = "Decimal"
      }else if(this.simbolos[i].tipo.tipo == 2) {
        this.simbolos[i].tipo.tipo = "Numero"
      }else if(this.simbolos[i].tipo.tipo == 3) {
        this.simbolos[i].tipo.tipo = "Caracter"
      }else if(this.simbolos[i].tipo.tipo == 4){
        this.simbolos[i].tipo.tipo = "String"
      }else if(this.simbolos[i].tipo.tipo == 5){
        this.simbolos[i].tipo.tipo = "Booleano"
      }else if(this.simbolos[i].tipo.tipo == 8){
        this.simbolos[i].tipo.tipo = "Void"
      }else if(this.simbolos[i].tipo.tipo == 9){
        this.simbolos[i].tipo.tipo = "Metodo"
      }else if(this.simbolos[i].tipo.tipo == 10){
        this.simbolos[i].tipo.tipo = "Funcion"
      }else if(this.simbolos[i].tipo.tipo == 11){
        this.simbolos[i].tipo.tipo = "Variable"
      }
      if(this.simbolos[i].tipo2.tipo == 0){
        this.simbolos[i].tipo2.tipo = "Entero"
      }else if(this.simbolos[i].tipo2.tipo == 1) {
        this.simbolos[i].tipo2.tipo = "Decimal"
      }else if(this.simbolos[i].tipo2.tipo == 2) {
        this.simbolos[i].tipo2.tipo = "Numero"
      }else if(this.simbolos[i].tipo2.tipo == 3) {
        this.simbolos[i].tipo2.tipo = "Caracter"
      }else if(this.simbolos[i].tipo2.tipo == 4){
        this.simbolos[i].tipo2.tipo = "String"
      }else if(this.simbolos[i].tipo2.tipo == 5){
        this.simbolos[i].tipo2.tipo = "Booleano"
      }else if(this.simbolos[i].tipo2.tipo == 8){
        this.simbolos[i].tipo2.tipo = "Void"
      }else if(this.simbolos[i].tipo2.tipo == 9){
        this.simbolos[i].tipo2.tipo = "Metodo"
      }else if(this.simbolos[i].tipo2.tipo == 10){
        this.simbolos[i].tipo2.tipo = "Funcion"
      }else if(this.simbolos[i].tipo2.tipo == 11){
        this.simbolos[i].tipo2.tipo = "Variable"
      }
    }
  }

}
