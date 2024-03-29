import { Component, Output, EventEmitter } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companylistselector',
  templateUrl: './companylistselector.component.html',
  styleUrls: ['./companylistselector.component.css']
})
export class CompanylistselectorComponent {

    selectedCompany: string = ''; 
    companies$: Observable<any[]>
    companyForm: FormGroup;
    admin: boolean = false;
    @Output() companySelected = new EventEmitter<any>();

    constructor(
      private companyService: CompanyService,
      private fb: FormBuilder,
      private router: Router) { 
        this.companyForm = this.fb.group({});
        this.companies$ = this.companyService.companies$;
      }

    ngOnInit(): void { 
      this.companyForm = this.fb.group({
        company: ['', Validators.required],
    });
    this.admin = localStorage.getItem('admin') === 'true'

    if(localStorage.getItem('authenticated') != 'true') {
      this.router.navigateByUrl('/')
    }
    
    if(!this.admin) {
      let cid = localStorage.getItem('cid')
      if(cid) {
        const id = parseInt(cid)
        this.router.navigateByUrl(`/company/${id}/announcements`)
      } else {
        this.router.navigateByUrl(`/`)
      }
    }
    }

  onSubmit() {
    if (this.companyForm.valid) {
      this.companyService.companies$.pipe(
        map(companies => companies.find(company => company.name === this.companyForm.value.company))
      ).subscribe(selectedCompany => {
        console.log(selectedCompany); 
        this.companySelected.emit(selectedCompany);
        // Navigate to the route for the selected company's teams
        this.router.navigate(['/company', selectedCompany?.id, 'announcements']);
      });
    }
  }
}
