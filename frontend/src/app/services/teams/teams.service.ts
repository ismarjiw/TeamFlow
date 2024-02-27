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

  // getAllTeams(): Observable<any> {
  //   return this.http.get<any>('http://localhost:8080/teams'); // Example backend URL
  // }

  private createdTeams: Team[] = [];

  // Method to create a new team (with fake data for now)
  createTeam(name: string, description: string, members: string[]): Observable<any> {
    const newTeam = {
      name,
      description,
      members
    };
    this.createdTeams.push(newTeam); 
    return of(newTeam); 
  }

  // Add methods for future backend interaction:
  /*
  getTeamById(teamId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/teams/${teamId}`);
  }

  createTeam(teamData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/teams', teamData);
  }

  updateTeam(teamId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/teams/${teamId}`, updatedData);
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/teams/${teamId}`);
  }
  */
}
