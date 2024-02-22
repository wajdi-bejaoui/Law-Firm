import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatesNewsComponent } from './lates-news.component';

describe('LatesNewsComponent', () => {
  let component: LatesNewsComponent;
  let fixture: ComponentFixture<LatesNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatesNewsComponent]
    });
    fixture = TestBed.createComponent(LatesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
