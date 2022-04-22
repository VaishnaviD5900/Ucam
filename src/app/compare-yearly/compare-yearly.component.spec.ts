import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareYearlyComponent } from './compare-yearly.component';

describe('CompareYearlyComponent', () => {
  let component: CompareYearlyComponent;
  let fixture: ComponentFixture<CompareYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
