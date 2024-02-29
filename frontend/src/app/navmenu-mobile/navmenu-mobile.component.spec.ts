import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavmenuMobileComponent } from './navmenu-mobile.component';

describe('NavmenuMobileComponent', () => {
  let component: NavmenuMobileComponent;
  let fixture: ComponentFixture<NavmenuMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavmenuMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavmenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
