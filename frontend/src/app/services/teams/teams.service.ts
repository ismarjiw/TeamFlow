import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type Team = {
  name: string;
  description: string;
  members: string[];
};

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  // constructor(private http: HttpClient) { } // Uncomment when ready for backend
apiUrl: string = "http://localhost:8080/"
  private createdTeams: Team[] = [];
constructor(private http: HttpClient) { }
  // Method to create a new team  \\ think about how to display # of projects when creating a team \\
//   createTeam(name: string, description: string, members: string[]): Observable<any> {
//     const newTeam = {
//       name,
//       description,
//       members
//     };
//     this.createdTeams.push(newTeam);
//     return of(newTeam);
//   }

  getCreatedTeams(): any[] {
    return this.createdTeams;
  }

  // Add methods for future backend interaction:


  // getTeams(): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:8080/get-teams').pipe(
  //     map((response: any) => {
  //       // Assuming response is an array of team objects
  //       this.teams = response;
  //       return this.teams;
  //     }),
  //     catchError((error) => {
  //       console.error('Error fetching teams:', error);
  //       return of([]);
  //     })
  //   );
  // }

  getTeamsByCompany(companyId: number): Observable<any[]> {
//  const url = `${this.apiUrl}/company/${companyId}/teams`;

     return new Observable<any[]>(observer => {
       fetch(`${this.apiUrl}company/${companyId}/teams`)
         .then(response => {
           if (!response.ok) {

             throw new Error(`HTTP error! Status: ${response.status}`);
           }
//            console.log(response.json());
           return response.json();
         })
         .then(data => {
           observer.next(data);
           observer.complete();
         })
         .catch(error => {
           observer.error(error);
           observer.complete();
         });
     });
   }
getUsersByCompany(companyId: number): Observable<any[]> {
//  const url = `${this.apiUrl}/company/${companyId}/teams`;

     return new Observable<any[]>(observer => {
       fetch(this.apiUrl + `company/${companyId}/users`)
         .then(response => {
           if (!response.ok) {

             throw new Error(`HTTP error! Status: ${response.status}`);
           }
//            console.log(response.json());
           return response.json();
         })
         .then(data => {
           observer.next(data);
           observer.complete();
         })
         .catch(error => {
           observer.error(error);
           observer.complete();
         });
     });
   }
//   getTeamById(teamId: number): Observable<any> {
//     return this.http.get<any>(`http://localhost:8080/teams/${teamId}`).pipe(
//       catchError((error) => {
//         console.error(`Error fetching team with ID ${teamId}:`, error);
//         return Observable.throw(error);
//       })
//     );
//   }
//
  createTeam(companyId:number, teamData: any): Promise<any> {
    return fetch(this.apiUrl + `company/${companyId}/teams`,
    			{
    				method: "POST",
    				headers: { "Content-Type": "application/json" },
    				body: JSON.stringify(teamData)
    			})
    			.then((response) => response.json())
    			.catch((err) => console.log(err))
    	}

//   updateTeam(teamId: number, updatedData: any): Observable<any> {
//     return this.http.put<any>(`http://localhost:8080/teams/${teamId}`, updatedData).pipe(
//       catchError((error) => {
//         console.error(`Error updating team with ID ${teamId}:`, error);
//         return Observable.throw(error);
//       })
//     );
//   }
//
//   deleteTeam(teamId: number): Observable<any> {
//     return this.http.delete<any>(`http://localhost:8080/teams/${teamId}`).pipe(
//       catchError((error) => {
//         console.error(`Error deleting team with ID ${teamId}:`, error);
//         return Observable.throw(error);
//       })
//     );
//   }

}
