import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bnf',
  templateUrl: './bnf.component.html',
  styleUrls: ['./bnf.component.css']
})
export class BnfComponent implements OnInit {

  displayedColumns: string[] = ['no', 'produccion', 'accion'];
  simbolos: any;

constructor() {this.simbolos = localStorage.getItem('bnf'); }

  ngOnInit(): void {
    this.simbolos = JSON.parse(this.simbolos);
    console.log(this.simbolos, "vacia?")
  }

}
