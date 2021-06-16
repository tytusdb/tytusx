import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Simbolo } from '../../controllers/xml/simbolo.controller';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-simbolos',
  templateUrl: './simbolos.component.html',
  styles: [
  ]
})
export class SimbolosComponent implements OnInit, AfterViewInit {
  public pageSize!: number;
  public displayedColumns: Array<string>;
  public dataSource: MatTableDataSource<any>;
  public data: Array<Simbolo>;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private screenHeight!: number;

  constructor(private _data: DataService) {
    this.onResize();
    this.dataSource = new MatTableDataSource<any>();
    this.displayedColumns = [ 'tipo', 'identificador', 'valor', 'ambito', 'linea', 'columna'];
    this.data = [];
  }

  async ngOnInit(): Promise<void> {
    this._data.currentSimbolos.subscribe(simbolo => this.data = simbolo)
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public handlePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(_event?: any) {
    this.screenHeight = window.innerHeight;

    const size = ((this.screenHeight * 0.95 - 148.5) / 48).toFixed()
    this.pageSize = Number(size);
  }
}
