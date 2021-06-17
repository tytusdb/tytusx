import { Component, OnInit } from '@angular/core';
import { DataServiceProvider } from 'src/data-service';




@Component({
  selector: 'app-code-tab',
  templateUrl: './code-tab.component.html',
  styleUrls: ['./code-tab.component.css']
})
export class CodeTabComponent implements OnInit {
  model1;

  theme1 = 'vs-dark';

  onCodeChanged1(value) {
    this.dat.Cod_tab1 = value;
  }
  
  onCodeChanged2(value) {
    this.dat.Cod_tab2 = value;
  }

  onCodeChanged3(value) {
    this.dat.Cod_tab3 = value;
  }
 

  options1 = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  constructor(public dat: DataServiceProvider) { }

  ngOnInit(): void {
  }

}
