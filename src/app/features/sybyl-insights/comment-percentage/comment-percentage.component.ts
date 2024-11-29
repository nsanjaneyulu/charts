import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-comment-percentage',
  standalone: true,
  imports: [ChartModule, CardModule],
  templateUrl: './comment-percentage.component.html',
  styleUrl: './comment-percentage.component.scss'
})
export class CommentPercentageComponent {
  donutChartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [30, 35, 35],
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'], // Green, Red, Orange
        hoverBackgroundColor: ['#28a745', '#dc3545', '#ffc107']
      }
    ]
  };

  donutChartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      datalabels: {
        color: '#fff',
        formatter: (value: number, context: any) => `${value}%`,
        font: {
          weight: 'bold',
          size: 12
        }
      },
      tooltip: {
        enabled: false
      }
    },


  };

}
