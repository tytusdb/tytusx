import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Arbol } from '../models/arbol.model';
import { ArbolXML } from '../models/xmlArbol.model';
import { Excepcion } from '../models/excepcion.model';
import { Simbolo } from '../controllers/xml/simbolo.controller';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private xml: BehaviorSubject<ArbolXML | undefined>;
  public currentXML: Observable<ArbolXML | undefined>;

  private consola: BehaviorSubject<string>;
  public currentConsola: Observable<string>;

  private gramatical: BehaviorSubject<string>;
  public currentGramatical: Observable<string>;

  private ast: BehaviorSubject<Object>;
  public currentAST: Observable<Object>;

  private cst: BehaviorSubject<Object>;
  public currentCST: Observable<Object>;

  private simbolos: BehaviorSubject<Array<Simbolo>>;
  public currentSimbolos: Observable<Array<Simbolo>>;

  private excepciones: BehaviorSubject<Array<Excepcion>>;
  public currentExcepciones: Observable<Array<Excepcion>>;

  constructor() {
    this.xml = new BehaviorSubject<ArbolXML | undefined>(undefined);
    this.currentXML = this.xml.asObservable();

    this.consola = new BehaviorSubject<string>('');
    this.currentConsola = this.consola.asObservable();

    this.gramatical = new BehaviorSubject<string>('');
    this.currentGramatical = this.gramatical.asObservable();

    this.ast = new BehaviorSubject<Object>({ name: 'RAIZ' });
    this.currentAST = this.ast.asObservable();

    this.cst = new BehaviorSubject<Object>({ name: 'RAIZ' });
    this.currentCST = this.cst.asObservable();

    this.simbolos = new BehaviorSubject<Array<Simbolo>>([]);
    this.currentSimbolos = this.simbolos.asObservable();

    this.excepciones = new BehaviorSubject<Array<Excepcion>>([]);
    this.currentExcepciones = this.excepciones.asObservable();
  }

  public changeXML(xml: ArbolXML | undefined): void {
    this.xml.next(xml);
  }

  public changeConsola(consola: string): void {
    this.consola.next(consola);
  }

  public changeGramatical(gramatical: string): void {
    this.gramatical.next(gramatical);
  }

  public changeAST(ast: Object): void {
    this.ast.next(ast);
  }

  public changeCST(cst: Object): void {
    this.cst.next(cst);
  }

  public changeSimbolos(simbolos: Array<Simbolo>): void {
    this.simbolos.next(simbolos);
  }

  public changeExcepciones(excepciones: Array<Excepcion>): void {
    this.excepciones.next(excepciones);
  }
}
