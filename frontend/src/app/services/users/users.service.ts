import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Employee } from '../company/company.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'http://localhost:8080/company/{id}/users';
  private deleteUserUrl = 'http://localhost:8080/company/{id}/user/{id}';

  constructor(private http: HttpClient) { } 

  private companyIdSubject = new BehaviorSubject<number | null>(null);

  users$ = this.companyIdSubject.pipe(
    tap(companyId => console.log('Company ID:', companyId)),
    switchMap(companyId => {
      if (companyId !== null) {
        const url = this.usersUrl.replace('{id}', companyId.toString());
        return this.http.get<any[]>(url)
      } else {
        // If companyId is null, return an empty array
        return [];
      }
    }),
    catchError(error => {
      // Handle error
      console.error('Error fetching users:', error);
      throw error;
    })
  );

  setCompanyId(companyId: number): void {
    this.companyIdSubject.next(companyId);
  }

  createUser$ = (user: Employee): Observable<any> => {
    return this.companyIdSubject.pipe(
      switchMap(companyId => {
        if (companyId !== null) {
          const url = this.usersUrl.replace('{id}', companyId.toString());
          return this.http.post<any>(url, user);
        } else {
          throw new Error('Company ID is not set.');
        }
      }),
      catchError(error => {
        // Handle error
        console.error('Error creating user:', error);
        throw error;
      })
    );
  };
  
  deleteUser$: (userId: number) => Observable<any> = (userId: number) => {
    return this.companyIdSubject.pipe(
      switchMap(companyId => {
        if (companyId !== null) {
          const url = this.deleteUserUrl
            .replace('{id}', companyId.toString())
            .replace('{id}', userId.toString());
          return this.http.delete<any>(url);
        } else {
          throw new Error('Company ID is not set.');
        }
      }),
      catchError(error => {
        // Handle error
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  };

}
