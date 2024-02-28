import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserregistryComponent } from './userregistry.component';

describe('UserregistryComponent', () => {
  let component: UserregistryComponent;
  let fixture: ComponentFixture<UserregistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserregistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserregistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
