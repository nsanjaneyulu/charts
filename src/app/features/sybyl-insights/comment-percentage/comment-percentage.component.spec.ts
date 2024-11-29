import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPercentageComponent } from './comment-percentage.component';

describe('CommentPercentageComponent', () => {
  let component: CommentPercentageComponent;
  let fixture: ComponentFixture<CommentPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentPercentageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
