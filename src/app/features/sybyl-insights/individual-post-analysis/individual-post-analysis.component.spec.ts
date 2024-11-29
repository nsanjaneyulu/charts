import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPostAnalysisComponent } from './individual-post-analysis.component';

describe('IndividualPostAnalysisComponent', () => {
  let component: IndividualPostAnalysisComponent;
  let fixture: ComponentFixture<IndividualPostAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualPostAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualPostAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
