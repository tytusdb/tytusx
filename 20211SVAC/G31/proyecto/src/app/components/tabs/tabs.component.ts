import { Component, OnInit } from '@angular/core';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { parser } from 'src/app/utils/gramaticaXML/gramaticaXML.js';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  public tabs: Array<Object>;
  public contadorTab: number;
  public indexTab: number;
  public options: Object;
  public contentXML: string;

  private file!: File;

  constructor() {
    this.tabs = new Array<Object>();
    this.tabs.push({ id: 0, content: '' });

    this.contadorTab = 0;
    this.indexTab = 0;

    this.options = this.optionsEditor();
    this.contentXML = '';
  }

  ngOnInit(): void { }

  private optionsEditor(): Object {
    return {
      theme: 'dracula',
      mode: 'application/xml',
      lineNumbers: true,
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
    };
  }

  public agregarTab(): void {
    this.tabs.push({ id: ++this.contadorTab, content: '' });
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.indexTab = tabChangeEvent.index;
  }

  public cargar(event: any): void {
    this.file = event.target.files[0];
    this.cargarArchivo();
  }

  private cargarArchivo(): void {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result != null) {
        if (this.indexTab == 0) {
          this.contentXML = fileReader.result.toString();
        } else {
          this.tabs[this.indexTab - 1]['content'] = fileReader.result.toString();
        }
      }
    }
    fileReader.readAsText(this.file);
  }

  public guardar() {
    if (this.indexTab == 0) {
      this.guardarArchivo(this.contentXML, 'text/xml', 'entradaXML.xml');
    } else {
      this.guardarArchivo(
        this.tabs[this.indexTab - 1]['content'],
        'text/xml',
        `tab${this.indexTab - 1}.xml`
      );
    }
  }

  private guardarArchivo(contenido: string, tipo: string, nombre: string): void {
    let a = document.createElement('a');
    let file = new Blob([contenido], { type: tipo });
    a.href = URL.createObjectURL(file);
    a.download = nombre;
    a.click();
  }

  public ejecutarXML():void {
    console.log(this.contentXML);
    const test = parser.parse(this.contentXML);
    console.log(test);
  }
}
