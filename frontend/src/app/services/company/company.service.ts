import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // constructor(private http: HttpClient) { }

  // getSelectedCompany(selectedCompany: String): Observable<any> {
  //   return this.http.get('http://localhost:8080/select-company');
  // }

  private companies = [
    {
      id: 1,
      name: 'Company A'
    },
    {
      id: 2, 
      name: 'Company B'
    }
  ];

  getSelectedCompany(selectedCompany: string) {

    // Find matching company
    const company = this.companies.find(c => c.name === selectedCompany);

    return of({
      // Return fake data for selected company  
      id: company?.id, 
      name: company?.name  
    });

  }

}

