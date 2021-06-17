import { Component, OnInit } from '@angular/core';

export interface CodeModel {
  language: string;
  value: string;
  uri: string;
 
  dependencies?: Array<string>;
  schemas?: Array<{
    uri: string;
    schema: Object;
  }>;
}


@Component({
  selector: 'app-code-tab2',
  templateUrl: './code-tab2.component.html',
  styleUrls: ['./code-tab2.component.css']
})
export class CodeTab2Component implements OnInit {
  model2;


  theme2 = 'vs';

  onCodeChanged2(value) {
    console.log('CODE', value);
  }
  
  codeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}'
  };
 
  options2 = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };


  constructor() { }

  ngOnInit(): void {
  }

}
