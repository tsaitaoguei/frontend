import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

// 修正：直接引入模組以執行其程式碼，讓它們自動註冊到 Highcharts 核心
// 這種 "side-effect" import 是更現代且穩健的做法，可以避免 'not callable' 錯誤
import 'highcharts/highcharts-more';
import 'highcharts/modules/solid-gauge';
import 'highcharts/modules/timeline';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    HighchartsChartComponent
  ],
  templateUrl: './chart.html',
  styleUrls: ['./chart.css'],
})
export class Chart implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() chartOptions?: Highcharts.Options = {}// 將 chartOptions 設置為可選的
  chartConstructor: ChartConstructorType = 'chart';
  updateFlag: boolean = false; // Optional
  oneToOneFlag: boolean = true; // Optional, defaults to fals

  constructor() {}

  ngOnInit() {
    if (!this.chartOptions) {
      this.chartOptions = {};
    }
  }
}
