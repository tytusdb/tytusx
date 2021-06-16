import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-consola',
  templateUrl: './consola.component.html',
  styles: [
  ]
})
export class ConsolaComponent implements OnInit {
  public options: any;
  public content: string;

  constructor(private _data: DataService) {
    this.options = {
      theme: 'material-ocean',      
      lineNumbers: false,
      lineWrapping: false,
      foldGutter: true,
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter',
        'CodeMirror-lint-markers'
      ],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true,
      readOnly: true
    };
    this.content = '';
  }

  ngOnInit(): void {
    this._data.currentConsola.subscribe(consola => this.content = consola);
  }
}
