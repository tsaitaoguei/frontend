import { Options } from 'highcharts';

// 描述單一節點
export interface ChartNode {
  stepLabel: string;
  chartType: 'trend' | 'gauge' | 'timeline' | 'label'; // 新增 'label' 類型
  chartOptions?: Options; // chartOptions 現在是可選的，因為 'label' 類型不需要它
}

// 描述一整條製程線
export interface ProcessLine {
  name: string;
  nodes: ChartNode[];
}