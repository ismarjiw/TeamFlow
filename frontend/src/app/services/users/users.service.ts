import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AddUserEntry } from 'src/app/modals/adduser/adduser.component';
import { UserEntry } from 'src/app/components/userregistry/userregistry.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/users';

  private createdUsers: UserEntry[] = [];

  // constructor(private http: HttpClient) { } 

  createUserTest(user: UserEntry): Observable<any> {
    const newUser = {
      name: user.name,
      email: user.email,
      active: user.active,
      admin: user.admin,
      status: user.status,
    };
    this.createdUsers.push(newUser); 
    return of(newUser); 
  }

  getCreatedUsers(): any[] {
    const usersCopy = this.createdUsers.map(user => ({
      name: user.name,
      email: user.email,
      active: user.active,
      admin: user.admin,
      status: user.status,
    }));
    
    return [...usersCopy];
  }

  // getAllUsers(): Observable<UserEntry[]> {
  //   return this.http.get<UserEntry[]>(this.apiUrl);
  // }

  // getUserById(id: number): Observable<UserEntry> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<UserEntry>(url);
  // }

  // createUser(user: UserEntry): Observable<UserEntry> {
  //   return this.http.post<UserEntry>(this.apiUrl, user);
  // }

  // createUserFromModal(user: AddUserEntry): Observable<AddUserEntry> {
  //   // Map to AddUserEntry type for backend
  //   const newUser: AddUserEntry = {
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     password: user.password,
  //     phone: user.phone,      
  //     isAdmin: user.isAdmin
  //   };
  //   return this.http.post<AddUserEntry>(this.apiUrl, newUser);
  // }

  // updateUser(id: number, user: UserEntry): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.put(url, user);
  // }

  // deleteUser(id: number): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete(url);
  // }

}
