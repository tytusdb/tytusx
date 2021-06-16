import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-reporte-gramatical',
  templateUrl: './reporte-gramatical.component.html',
  styles: [
  ]
})
export class ReporteGramaticalComponent implements OnInit {
  public options: any;
  public content: string;

  constructor(private _data: DataService) {
    this.options = {
      theme: 'material-ocean',
      mode: null,
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
    this._data.currentGramatical.subscribe(gramatical => this.content = gramatical);
  }
}
