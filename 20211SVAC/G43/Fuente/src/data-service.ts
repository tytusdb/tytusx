import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { HttpParams } from "@angular/common/http";

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

@Injectable()
export class DataServiceProvider {

//INFORMACION DEL USUARIO LOGEADO     
/*
    Actualmente almacena informacion del usuario, la empresa, sus direcciones y el rol del usuario. 
*/
public Cod_tab1 = "";
public Cod_tab2 = "";
public Cod_tab3 = "";
public Cod_tab4 : CodeModel = {
  language: 'typescript',
  uri: 'main.ts',
  value: ''
};
  constructor() {
  }


}
