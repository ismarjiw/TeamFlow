import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylistselectorComponent } from './companylistselector.component';

describe('CompanylistselectorComponent', () => {
  let component: CompanylistselectorComponent;
  let fixture: ComponentFixture<CompanylistselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanylistselectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanylistselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
