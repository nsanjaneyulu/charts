import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentOverTimeComponent } from './sentiment-over-time.component';

describe('SentimentOverTimeComponent', () => {
  let component: SentimentOverTimeComponent;
  let fixture: ComponentFixture<SentimentOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentOverTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentimentOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
