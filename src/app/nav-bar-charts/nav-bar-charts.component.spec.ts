import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarChartsComponent } from './nav-bar-charts.component';

describe('NavBarChartsComponent', () => {
  let component: NavBarChartsComponent;
  let fixture: ComponentFixture<NavBarChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
