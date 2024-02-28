import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface Company {
  id: number;
  name: string; 
  description: string;
  teams: Team[];
  employees: Employee[];
}

export interface Team {
  id: number;
  name: string;
  description: string;
  teammates: Teammate[];
}

export interface Teammate {
  id: number;
  profile: UserProfile;
  admin: boolean;
  active: boolean;
  status: string;
}

export interface Employee {
  id: number;
  profile: UserProfile;
  admin: boolean;
  active: boolean;
  status: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companiesUrl: string = 'http://localhost:8080/company'

  constructor(private http: HttpClient) { }

  companies$ = this.http.get<Company[]>(this.companiesUrl)
  .pipe(
    map(response => response.map(company => ({
      id: company.id,
      name: company.name,
      description: company.description,
      teams: company.teams.map(team => ({
        id: team.id,
        name: team.name,
        teammates: team.teammates.map(teammate => ({
          id: teammate.id,
          profile: teammate.profile,
          admin: teammate.admin,
          active: teammate.active,
          status: teammate.status
        }))
      })),
      employees: company.employees.map(employee => ({
        id: employee.id,
        profile: employee.profile,
        admin: employee.admin,
        active: employee.active,
        status: employee.status
      }))  
    })))
  );
}

