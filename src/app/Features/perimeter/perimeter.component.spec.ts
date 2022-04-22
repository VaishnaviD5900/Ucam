import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerimeterComponent } from './perimeter.component';

describe('PerimeterComponent', () => {
  let component: PerimeterComponent;
  let fixture: ComponentFixture<PerimeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerimeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerimeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
