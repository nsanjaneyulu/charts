import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { IndividualPostChartComponent} from '../individual-post-chart/individual-post-chart.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-individual-post-analysis',
  standalone: true,
  imports: [TabViewModule, IndividualPostChartComponent, CommonModule],
  templateUrl: './individual-post-analysis.component.html',
  styleUrl: './individual-post-analysis.component.scss'
})
export class IndividualPostAnalysisComponent {
  bubbleChartData: any;
  bubbleChartOptions: any;
  comments: { comment: string; commentedBy: string; LikedBy: string; sentimentType: 'positive' | 'neutral' | 'negative' }[] = [];
  currentPageComments: any;
  selectedWord: string = '';
  selectedSentimentType: 'positive' | 'neutral' | 'negative' = 'positive';
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  highlightedClass: string = '';
  pageOptions: number[] = [];

  ngOnInit() {
    this.currentPageComments = [
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
  }

  paginateComments() {
    const startIndex = (this.currentPage - 1);
    this.currentPageComments = this.comments.slice(startIndex, startIndex);
  }
  onPageChange(event: any) {
    this.currentPage = Number(event.target.value);
    this.paginateComments();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.currentPageComments.length);
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
