import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styles: [
  ]
})
export class AstComponent implements OnInit {
  public initOpts: any;
  public options: any;
  public autoResize: boolean;

  constructor(private _dataService: DataService) {
    this.autoResize = true;

    this.options = {
      backgroundColor: '#0f111a',

      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },

      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          saveAsImage: {
            name: 'AST',
            show: true,
            type: 'png',
            backgroundColor: null
          },
        },
      },

      series: [
        {
          type: 'tree',
          data: [],
          orient: 'vertical',

          // width: '100%',
          // height: '100%',

          left: '1%',
          right: '1%',
          top: '5%',
          bottom: '5%',

          symbol: 'emptyCircle',
          symbolSize: 10,

          roam: true,
          initialTreeDepth: undefined,

          // edgeShape: 'polyline',
          // edgeForkPosition: '63%',

          expandAndCollapse: true,

          label: {
            position: 'top',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 13,
            color: '#E91E63'
          },
          itemStyle: {
            color: '#E91E63',
          },
          lineStyle: {
            // color: '#fff'
          },

          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },

          emphasis: {
            focus: 'descendant'
          },

          animationDuration: 550,
          animationDurationUpdate: 750
        },
      ],
    };
  }

  ngOnInit(): void {
    this._dataService.currentAST.subscribe(ast => this.setData(ast));
  }

  public setData(data: object): void {
    this.options.series[0].data = [data];
  }
}
