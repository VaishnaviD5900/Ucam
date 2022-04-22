import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareMonthlyComponent } from './compare-monthly.component';

describe('CompareMonthlyComponent', () => {
  let component: CompareMonthlyComponent;
  let fixture: ComponentFixture<CompareMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
