import { Component, Output, EventEmitter } from '@angular/core';
import { CompanyService } from '../services/company/company.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companylistselector',
  templateUrl: './companylistselector.component.html',
  styleUrls: ['./companylistselector.component.css']
})
export class CompanylistselectorComponent {

    companies: string[] = ['Company A', 'Company B'];
    selectedCompany: string = ''; 

    companyForm: FormGroup;
    @Output() companySelected = new EventEmitter<any>();

    constructor(
      private companyService: CompanyService,
      private fb: FormBuilder,
      private router: Router) { 
        this.companyForm = this.fb.group({});
      }

    ngOnInit(): void { 
      this.companyForm = this.fb.group({
        company: ['', Validators.required],
    });
    }

  onSubmit() {
    if (this.companyForm.valid) {
      this.companyService.getSelectedCompany(this.selectedCompany)
        .subscribe(company => {
          console.log(company);
          this.companySelected.emit(company);
          // this.router.navigateByUrl('/teams}'); // will route user to teams page
        });
    }
  }

}
