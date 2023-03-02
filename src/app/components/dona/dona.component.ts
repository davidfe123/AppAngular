import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {
  ngOnInit(){
  }
  
  @Input('titulo') titulo:string = 'sin titulo';
  @Input() data: number [];
  @Input('labels') doughnutChartLabels: string[] = ['label 1','label 2','label 3'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };
  
  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData={
   
      labels: this.doughnutChartLabels,
      datasets:[{ data: this.data}]
   
    }
   
  }
  
  
  public doughnutChartType: ChartType = 'doughnut';
}
