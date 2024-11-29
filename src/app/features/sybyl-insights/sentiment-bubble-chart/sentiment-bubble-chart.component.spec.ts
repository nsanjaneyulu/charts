import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentBubbleChartComponent } from './sentiment-bubble-chart.component';

describe('SentimentBubbleChartComponent', () => {
  let component: SentimentBubbleChartComponent;
  let fixture: ComponentFixture<SentimentBubbleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentBubbleChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentimentBubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
