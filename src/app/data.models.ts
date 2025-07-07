import { Options } from 'highcharts';

// 描述單一節點
export interface ChartNode {
  stepLabel: string;
  chartType: 'trend' | 'gauge' | 'timeline';
  chartOptions: Options;
}

// 描述一整條製程線
export interface ProcessLine {
  name: string;
  nodes: ChartNode[];
}