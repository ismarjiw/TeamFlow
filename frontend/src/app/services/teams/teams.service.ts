import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  private createdTeams: Team[] = [];

  // Method to create a new team  \\ think about how to display # of projects when creating a team \\ 
  createTeam(name: string, description: string, members: string[]): Observable<any> {
    const newTeam = {
      name,
      description,
      members
    };
    this.createdTeams.push(newTeam); 
    return of(newTeam); 
  }

  getCreatedTeams(): any[] {
    return this.createdTeams;
  }

  // Add methods for future backend interaction:
  /*

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
    return this.http.get<any[]>(`http://localhost:8080/companies/${companyId}/teams`);
  }

  getTeamById(teamId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/teams/${teamId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching team with ID ${teamId}:`, error);
        return Observable.throw(error);
      })
    );
  }

  createTeam(teamData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/teams', teamData).pipe(
      catchError((error) => {
        console.error('Error creating team:', error);
        return Observable.throw(error);
      })
    );
  }

  updateTeam(teamId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/teams/${teamId}`, updatedData).pipe(
      catchError((error) => {
        console.error(`Error updating team with ID ${teamId}:`, error);
        return Observable.throw(error);
      })
    );
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/teams/${teamId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting team with ID ${teamId}:`, error);
        return Observable.throw(error);
      })
    );
  }
  */
}
