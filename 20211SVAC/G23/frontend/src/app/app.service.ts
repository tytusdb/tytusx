import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  _url = "http://localhost:3080";

  constructor(private http: HttpClient) { }

  compile(input: any) {
    return this.http.post<any>(this._url + '/compile', input);
  }

  getAST(input: any) {
    return this.http.post(this._url + '/AST_report', input, {
      responseType: 'blob'
    });
  }

  getCST(input: any) {
    return this.http.post(this._url + '/CST_report', input, {
      responseType: 'blob'
    });
  }

  getDAG(input: any) {
    return this.http.post(this._url + '/DAG_report', input, {
      responseType: 'blob'
    });
  }

}
