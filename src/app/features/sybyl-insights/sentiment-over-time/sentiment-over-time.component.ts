import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js'; // Adjust the import according to your Chart.js version
import Chart from 'chart.js/auto';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sentiment-over-time',
  standalone: true,
  imports: [ChartModule, CardModule],
  templateUrl: './sentiment-over-time.component.html',
  styleUrl: './sentiment-over-time.component.scss'
})
export class SentimentOverTimeComponent {
  lineChartData!: ChartData<'line'>; // Type for the line chart data
  lineChartOptions!: ChartOptions<'line'>; // Type for the line chart options

  ngOnInit(): void {
    Chart.register(DataLabelsPlugin);
    this.lineChartData = {

      labels: ['01 Jan', '01 Feb', '01 Mar', '01 Apr', '01 May', '01 June', '01 July', '01 Aug', '01 Sep', '01 Oct', '01 Nov', '01 Dec'],
      datasets: [
        {
          label: 'Positive Sentiment', // More descriptive label
          data: [25, 30, 50, 45, 30, 45, 30, 45, 40, 20, 25, 20],
          fill: true,
          borderColor: '#4CAF50', // Green color
          backgroundColor: 'rgba(231, 247, 236, 0.5)', // Light background color for fill
          tension: 0,
          pointRadius: 5, // Size of dots
          pointHoverRadius: 10, // Size of dots on hover
          pointBackgroundColor: '#4CAF50', // Same as borderColor for dots
          pointBorderColor: '#4CAF50', // Same as borderColor for dots
          showLine: true, // Ensures line is drawn
          pointHoverBorderColor: '#FF0000'
        },
        {
          label: 'Neutral Sentiment', // More descriptive label
          data: [50, 55, 60, 55, 65, 70, 85, 80, 90, 80, 50, 65],
          fill: true,
          borderColor: '#FFA726', // Orange color
          backgroundColor: 'rgba(253, 244, 237, 0.5)', // Light orange background for fill
          tension: 0,
          pointRadius: 5,
          pointHoverRadius: 10,
          pointBackgroundColor: '#FFA726', // Same as borderColor for dots
          pointBorderColor: '#FFA726', // Same as borderColor for dots
          showLine: true,
          pointHoverBorderColor: '#FF0000',
        },
        {
          label: 'Negative Sentiment', // More descriptive label
          data: [85, 87, 78, 99, 95, 85, 98, 86, 99, 94, 94, 85],
          fill: true,
          borderColor: '#FF0000', // Red color
          backgroundColor: 'rgba(254, 234, 236, 0.5)', // Light red background for fill
          tension: 0, // Straight lines
          pointRadius: 5, // Size of dots
          pointHoverRadius: 10, // Size of dots on hover
          pointBackgroundColor: '#FF0000', // Same as borderColor for dots
          pointBorderColor: '#FF0000', // Same as borderColor for dots
          pointHoverBorderColor: '#FFA726',
          showLine: true,

        }
      ]
    };

    this.lineChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          enabled: false // Disable tooltips
        },
        datalabels: {
          display: false // Disable data labels on points
        }
      },
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
          beginAtZero: true,
          ticks: {
            stepSize: 25, // Set interval for y-axis values to 25
            callback: (value) => `${value}%` // Append '%' to y-axis values
          }
        }
      }
    };
  }

}
