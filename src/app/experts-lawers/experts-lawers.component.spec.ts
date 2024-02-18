import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsLawersComponent } from './experts-lawers.component';

describe('ExpertsLawersComponent', () => {
  let component: ExpertsLawersComponent;
  let fixture: ComponentFixture<ExpertsLawersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertsLawersComponent]
    });
    fixture = TestBed.createComponent(ExpertsLawersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
