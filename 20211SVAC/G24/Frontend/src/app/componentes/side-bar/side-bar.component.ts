import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: 'Principal', route: 'inicio', icon: 'home' },
    { name: 'Arbol CST Ascendente', route: 'ast', icon: 'share' },
    { name: 'Arbol CST Descendente', route: 'ast-desc', icon: 'gesture' },
    {
      name: 'Tabla Simbolos',
      route: 'simbolos',
      icon: 'view_quilt',
    },
    { name: 'Reporte gramatical', route: 'gramatical', icon: 'list_alt' },
    /*device_hub*/
    { name: 'Arbol AST', route: 'xpath-ast', icon: 'device_hub' },
    { name: 'Reporte Errores', route: 'errores', icon: 'coronavirus' },
    { name: 'Reporte Optimizacion', route: 'optimo', icon: 'swap_horizontal_circle'},
    { name: 'Tabla Simbolos XQuery', route: 'simbolos-xquery', icon: 'bubble_chart'}

    //ast
    //errores
    //tablaSimbolos
    //inicio {consola, pestanias,botones}
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
}
