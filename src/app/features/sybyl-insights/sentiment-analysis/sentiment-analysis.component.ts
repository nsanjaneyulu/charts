import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommentPercentageComponent} from '../comment-percentage/comment-percentage.component';
import { SentimentOverTimeComponent} from '../sentiment-over-time/sentiment-over-time.component';
import { SentimentBubbleChartComponent} from '../sentiment-bubble-chart/sentiment-bubble-chart.component';
import { OverallSentimentScoreComponent} from '../overall-sentiment-score/overall-sentiment-score.component';
import { IndividualPostAnalysisComponent} from '../individual-post-analysis/individual-post-analysis.component';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.scss'],
  imports: [CommentPercentageComponent, SentimentOverTimeComponent, IndividualPostAnalysisComponent, SentimentBubbleChartComponent, OverallSentimentScoreComponent],
  standalone: true,
})
export class SentimentAnalysisComponent {
  ngOnInit(): void {
    Chart.register(DataLabelsPlugin);
  }

  constructor() {}


  
}
