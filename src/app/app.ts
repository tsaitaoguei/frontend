import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from './components/chart/chart';
import { ProcessLine, ChartNode } from './data.models';
import { Options } from 'highcharts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Chart
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  public processLines: ProcessLine[] = [
    {
      name: 'HBM',
      nodes: [
        { stepLabel: '壓力測試', chartType: 'gauge', chartOptions: this.getGaugeOptions('壓力', 85) },
        { stepLabel: '溫度趨勢', chartType: 'trend', chartOptions: this.getTrendOptions('溫度', [45, 48, 46, 50, 52]) },
        { stepLabel: '歷史紀錄', chartType: 'timeline', chartOptions: this.getTimelineOptions('HBM 歷史事件') }
      ]
    },
    {
      name: 'PWF',
      nodes: [
        { stepLabel: '初始點檢', chartType: 'gauge', chartOptions: this.getGaugeOptions('完整度', 92) },
        { stepLabel: '中期監控', chartType: 'trend', chartOptions: this.getTrendOptions('效能', [120, 122, 118, 125]) },
        { stepLabel: '良率分析', chartType: 'trend', chartOptions: this.getTrendOptions('良率', [98.5, 98.6, 98.4, 98.8]) },
        { stepLabel: '最終審核', chartType: 'timeline', chartOptions: this.getTimelineOptions('PWF 審核紀錄') }
      ]
    },
    {
      name: 'TEST',
      nodes: [
        { stepLabel: '訊號強度', chartType: 'gauge', chartOptions: this.getGaugeOptions('訊號強度', 78) },
        { stepLabel: '數據 A', chartType: 'trend', chartOptions: this.getTrendOptions('數據 A', [5.1, 5.2, 5.0, 5.3]) }
      ]
    }
  ];

  constructor() {
    // 在 constructor 中處理 processLines，將 name 轉化為一個 node
    this.processLines = this.processLines.map(line => {
      const titleNode: ChartNode = {
        stepLabel: line.name,
        chartType: 'label' // 設定為新的 'label' 類型
      };
      return {
        ...line,
        nodes: [titleNode, ...line.nodes] // 將 titleNode 放在最前面
      };
    });
  }

  private getGaugeOptions(name: string, value: number): Options {
    return {
      chart: { type: 'solidgauge', backgroundColor: 'transparent' },
      title: { text: name, style: { fontSize: '1.1rem' } },
      pane: {
        center: ['50%', '70%'], size: '100%',
        startAngle: -90, endAngle: 90,
        background: [{ 
          innerRadius: '60%', 
          outerRadius: '100%', 
          shape: 'arc', 
          backgroundColor: '#EEE' 
        }]
      },
      yAxis: {
        min: 0, max: 100,
        stops: [[0.1, '#55BF3B'],[0.5, '#DDDF0D'],[0.9, '#DF5353']],
        lineWidth: 0, tickAmount: 2
      },
      plotOptions: {
        solidgauge: {
          dataLabels: { y: 5, borderWidth: 0, useHTML: true, format: '<div style="text-align:center"><span style="font-size:2rem">{y}</span></div>' }
        }
      },
      series: [{ type: 'solidgauge', name: name, data: [value] }]
    };
  }

  private getTrendOptions(name: string, data: number[]): Options {
    return {
      chart: { type: 'spline', backgroundColor: 'transparent' },
      title: { text: name, style: { fontSize: '1.1rem' } },
      legend: { enabled: false },
      yAxis: [
        { title: { text: undefined } }
      ],
      xAxis: { categories: data.map((_, i) => `T${i + 1}`) },
      series: [{ type: 'spline', name, data }]
    };
  }

  private getTimelineOptions(name: string): Options {
    return {
      chart: { type: 'timeline', backgroundColor: 'transparent' },
      title: { text: name, style: { fontSize: '1.1rem' } },
      xAxis: { visible: false }, yAxis: { visible: false },
      series: [{
        type: 'timeline',
        dataLabels: { allowOverlap: false, format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > {point.name}</span><br/>{point.label}' },
        data: [ { name: '事件 A', label: '2025-01-01', description: '...' }, { name: '事件 B', label: '2025-03-15', description: '...' } ]
      }]
    };
  }
}
