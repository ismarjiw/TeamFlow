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

  // Fake data for teams until connected to backend
  private teams = [
    { name: 'Marketing', totalProjects: 5, members: ['Alice', 'Bob', 'Charlie'] },
    { name: 'Engineering', totalProjects: 8, members: ['David', 'Emily', 'Frank'] },
    { name: 'Sales', totalProjects: 4, members: ['Grace', 'Harry', 'Isabella'] }
  ];

  private createdTeams: Team[] = [];

  getAllTeams(): Observable<any> {
    return of(this.teams);
  }

  // Method to create a new team
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
