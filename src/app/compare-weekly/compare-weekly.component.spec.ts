import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareWeeklyComponent } from './compare-weekly.component';

describe('CompareWeeklyComponent', () => {
  let component: CompareWeeklyComponent;
  let fixture: ComponentFixture<CompareWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
