import { Component } from '@angular/core';
import { DataServiceProvider } from 'src/data-service';
import * as saveAs from 'file-saver';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { xml2json } from 'xml-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto1201314408';
  xml = `<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>`;
 

  constructor(public dat: DataServiceProvider, public ngxXml2jsonService: NgxXml2jsonService){

  }

  SaveDemo1() {
    let file = new Blob([this.dat.Cod_tab1], { type: 'text;charset=utf-8' });
    saveAs(file, 'XPATH.txt')
  }

  SaveDemo2() {
    let file = new Blob([this.dat.Cod_tab2], { type: 'text;charset=utf-8' });
    saveAs(file, 'XQUERY.txt')
  }

  file:any;
fileChanged(e,variable) {
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
    if(variable === 1){
      this.dat.Cod_tab1 = fileReader.result.toString();
    }  

    if(variable === 2 ){
      this.dat.Cod_tab2 = fileReader.result.toString();
    }

    }
    fileReader.readAsText(this.file);
}
file2:any;
fileChanged2(e) {
  this.file2 = e.target.files[0];
  let fileReader2 = new FileReader();
  fileReader2.onload = (e) => {
  this.dat.Cod_tab2 = fileReader2.result.toString();
  }
  fileReader2.readAsText(this.file2);
}

  CleanEditor1(){
    this.dat.Cod_tab1 = "";
  }

  CleanEditor2(){
    this.dat.Cod_tab2 = "";
  }

  onCodeChanged1(value) {
    this.dat.Cod_tab1 = value;
  }

  onCodeChanged2(value) {
    this.dat.Cod_tab2 = value;
  }

  onCodeChanged3(value) {
    this.dat.Cod_tab3 = value;
  }


  parseValueXML(){
    var result2 = xml2json(this.dat.Cod_tab1, {compact: true, spaces: 0,alwaysArray:true,attributesKey:"AtributoJSON",textKey:"TextoNodoJson"});
    console.log((result2));
    console.log(JSON.parse(result2));
    this.recorrerJSON(JSON.parse(result2));
  }

 process(key,value) {
    console.log(key + " : "+value);
}

 traverse(o,func) {
    for (var i in o) {
        func.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
            //going one step down in the object tree!!
            this.traverse(o[i],func);
        }
    }
}

//that's all... no magic, no bloated framework



 recorrerJSON(JsonObject:Object){
  Object.entries(JsonObject).forEach(([key, value]) => {
    // do something with key and val
    console.log(value);
    this.recorrerJSON(value);
});
 }
}
