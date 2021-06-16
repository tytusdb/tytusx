import { Component } from '@angular/core';
import { DataServiceProvider } from 'src/data-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto1201314408';

  frontEndHTMLCode = "";

  constructor(public dat: DataServiceProvider){

  }
  file:any;
  fileChanged(e) {
      this.file = e.target.files[0];

      let fileReader = new FileReader();
      fileReader.onload = (e) => {
      this.dat.Cod_tab1 = fileReader.result.toString();
    }
    fileReader.readAsText(this.file);
  }
  myFunc(){
    console.log(this.dat.Cod_tab1);
    console.log(this.dat.Cod_tab2);
  }

  CleanEditors(){
    this.dat.Cod_tab1 = "";
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

}
