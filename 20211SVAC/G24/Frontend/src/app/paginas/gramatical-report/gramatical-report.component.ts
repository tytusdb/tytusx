import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gramatical-report',
  templateUrl: './gramatical-report.component.html',
  styleUrls: ['./gramatical-report.component.css']
})
export class GramaticalReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let info = window.localStorage.getItem('gramatica');
    console.log(info);
    let texto=document.getElementById("text2");
    if(texto!= null){
      texto.innerHTML+=info;
    }
  }

}
