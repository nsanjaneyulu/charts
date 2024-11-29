import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPostChartComponent } from './individual-post-chart.component';

describe('IndividualPostChartComponent', () => {
  let component: IndividualPostChartComponent;
  let fixture: ComponentFixture<IndividualPostChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualPostChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualPostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
