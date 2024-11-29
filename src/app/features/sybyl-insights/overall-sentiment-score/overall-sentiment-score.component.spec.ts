import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSentimentScoreComponent } from './overall-sentiment-score.component';

describe('OverallSentimentScoreComponent', () => {
  let component: OverallSentimentScoreComponent;
  let fixture: ComponentFixture<OverallSentimentScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallSentimentScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallSentimentScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
