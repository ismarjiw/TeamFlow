import { Component } from '@angular/core';
import { TeamsService } from '../services/teams/teams.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateteamComponent } from '../createteam/createteam.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  constructor(
    private teamsService: TeamsService, // later for when grabbing team data from backend 
    public dialog: MatDialog,
    ) {}

  // Placeholder teams data
  teams = [
    {
      name: 'Team 1',
      totalProjects: 1, 
      members: ['Sherry', 'Ismarji', 'Wolfy', 'Matthew'] 
    },
    {
      name: 'Team 2',
      totalProjects: 2, 
      members: ['Sherry', 'Matthew'] 
    },
    {
      name: 'Team 3',
      totalProjects: 1, 
      members: ['Sherry', 'Ismarji', 'Wolfy', 'Matthew'] 
    },
    {
      name: 'Team 4',
      totalProjects: 2, 
      members: ['Sherry', 'Matthew'] 
    }
  ]

  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateteamComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Check if a new team was created
      if (result) {
        console.log(result);
      }
    });
  }

}
