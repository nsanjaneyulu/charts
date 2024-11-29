
import { Component, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { color } from 'html2canvas/dist/types/css/types/color';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sentiment-bubble-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, PaginatorModule, CardModule],
  templateUrl: './sentiment-bubble-chart.component.html',
  styleUrl: './sentiment-bubble-chart.component.scss'
})
export class SentimentBubbleChartComponent {
  bubbleChartData: any;
  bubbleChartOptions: any;
  comments: { comment: string; commentedBy: string; LikedBy: string; sentimentType: 'positive' | 'neutral' | 'negative' }[] = [];
  currentPageComments: { comment: string; commentedBy: string; LikedBy: string; sentimentType: 'positive' | 'neutral' | 'negative' }[] = [];
  selectedWord: string = '';
  selectedSentimentType: 'positive' | 'neutral' | 'negative' = 'positive';
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  highlightedClass: string = '';
  pageOptions: number[] = [];

  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    const padding = 5;
    this.initializeChartData(padding);
  }

  initializeChartData(padding: number) {
    this.bubbleChartData = {
      datasets: [
        {
          sentimentType: 'Positive',
          data: [
            { x: 22, y: 7, r: this.calculateRadius('Good', padding), word: 'Good' },
            { x: 7, y: 14, r: this.calculateRadius('Love it', padding), word: 'Love it' },
            { x: 5, y: 24, r: this.calculateRadius('Fantastic', padding), word: 'Fantastic' },
            { x: 22, y: 14, r: this.calculateRadius('Joyful', padding), word: 'Joyful' },
            { x: 7, y: 2, r: this.calculateRadius('Beautiful', padding), word: 'Beautiful' }
          ],
          backgroundColor: '#28a745'
        },
        {
          sentimentType: 'Negative',
          data: [
            { x: 12, y:19, r: this.calculateRadius('Not good', padding), word: 'Not good' },
            { x: 3, y: 18, r: this.calculateRadius('Worst', padding), word: 'Worst' },
            { x: 14, y: 25, r: this.calculateRadius('Terrible', padding), word: 'Terrible' },
            { x: 7, y: 8, r: this.calculateRadius('Angry', padding), word: 'Angry' },
            { x: 16, y: 11, r: this.calculateRadius('Atrocious', padding), word: 'Atrocious' }
          ],
          backgroundColor: '#dc3545'
        },
        {
          sentimentType: 'Neutral',
          data: [
            { x: 13, y: 6, r: this.calculateRadius('Okay', padding), word: 'Okay' },
            { x: 22, y: 20, r: this.calculateRadius('Not bad', padding), word: 'Not bad' },
            { x: 18, y: 4, r: this.calculateRadius('Average', padding), word: 'Average' }
          ],
          backgroundColor: '#ffc107'
        }
      ]
    };

    this.bubbleChartOptions = {
      responsive: true,
      aspectRatio: 1,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: {
          color: 'white',
          font: { weight: 'bold', size: 11 },
          formatter: (value: any) => value.word,
          align: 'center'
        }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      },
      onClick: (event: any, elements: any) => this.onBubbleClick(event, elements)
    };
  }

  calculateRadius(word: string, padding: number): number {
    return word.length * 3 + padding;
  }

  onBubbleClick(event: any, elements: any) {
    if (elements.length > 0) {
      const datasetIndex = elements[0].datasetIndex;
      const index = elements[0].index;
      const selectedWord = this.bubbleChartData.datasets[datasetIndex].data[index].word;
      const selectedSentimentType = this.bubbleChartData.datasets[datasetIndex].sentimentType.toLowerCase() as 'positive' | 'neutral' | 'negative';

      this.selectedWord = selectedWord;
      this.selectedSentimentType = selectedSentimentType;
      this.currentPage = 1;
      this.comments = this.getCommentsByWord(selectedWord);
      this.updatePagination();
      this.paginateComments();
      this.cdr.detectChanges();
    }
  }

  getCommentsByWord(word: string): { comment: string; commentedBy: string; LikedBy: string; sentimentType: 'positive' | 'neutral' | 'negative' }[] {
    return this.allComments.filter((c) => c.comment.includes(word));
  }

  allComments: { comment: string; commentedBy: string; LikedBy: string; sentimentType: 'positive' | 'neutral' | 'negative' }[] = [
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The quality is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it can improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, worked for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The quality is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it can improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, worked for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The quality is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it angry improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, worked for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The quality is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it can improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, worked for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The quality is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it can improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, Atrocious for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The Atrocious is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it can improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, worked for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The quality is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it can improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, worked for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Good product, really liked it', commentedBy: '@Alice', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Good value for money', commentedBy: 'Bob', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Love it! The quality is amazing', commentedBy: '@Charlie', LikedBy: '2.4K', sentimentType: 'positive' },
    { comment: 'Not good, expected better', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Worst experience ever', commentedBy: '@Eve', LikedBy: '2.4K', sentimentType: 'negative' },
    { comment: 'Not bad, it can improve', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
    { comment: 'Not bad, worked for me', commentedBy: '@Dana', LikedBy: '2.4K', sentimentType: 'neutral' },
  ];

  paginateComments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.currentPageComments = this.comments.slice(startIndex, startIndex + this.pageSize);
  }

  highlightWord(comment: string, word: string, sentiment: "positive" | "neutral" | "negative" = "neutral"): SafeHtml {
    const colorMap = {
      positive: 'green',
      neutral: 'orange',
      negative: 'red'
    };
    const color = colorMap[sentiment] || 'black';

    const highlightedComment = comment.replace(
      new RegExp(`(${word})`, 'gi'),
      `<span style="color: ${color}; font-weight: bold;">$1</span>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(highlightedComment);
  }

  onPageChange(event: any) {
    this.currentPage = Number(event.target.value);
    this.paginateComments();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.comments.length / this.pageSize);
    this.pageOptions = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateComments();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateComments();
    }
  }

  get disablePrevious(): boolean {
    return this.currentPage <= 1;
  }

  get disableNext(): boolean {
    return this.currentPage >= this.totalPages;
  }


}
