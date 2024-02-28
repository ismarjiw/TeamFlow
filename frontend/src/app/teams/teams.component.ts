import { Component } from '@angular/core';
import { TeamsService } from '../services/teams/teams.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateteamComponent } from '../createteam/createteam.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  teams: any[] = [];

  constructor(
    private teamsService: TeamsService, 
    public dialog: MatDialog,
    private route: ActivatedRoute // to get the company ID from the route parameters
    ) {}

    ngOnInit() {
      this.teams = this.teamsService.getCreatedTeams();

      //***/ to get the company specific teams array \***\\
      // this.route.params.subscribe(params => {
      //   const companyId = +params['companyId']; // Assuming companyId is a number
      //   // Fetch teams associated with the company
      //   this.teamsService.getTeamsByCompany(companyId).subscribe(teams => {
      //     this.teams = teams;
      //   });
      // });
    }

  //***/ Dummy data \***\\
  // teams = [
  //   {
  //     name: 'Team 1',
  //     totalProjects: 1, 
  //     members: ['Sherry', 'Ismarji', 'Wolfy', 'Matthew'] 
  //   },
  //   {
  //     name: 'Team 2',
  //     totalProjects: 2, 
  //     members: ['Sherry', 'Matthew'] 
  //   },
  //   {
  //     name: 'Team 3',
  //     totalProjects: 1, 
  //     members: ['Sherry', 'Ismarji', 'Wolfy', 'Matthew'] 
  //   },
  //   {
  //     name: 'Team 4',
  //     totalProjects: 2, 
  //     members: ['Sherry', 'Matthew'] 
  //   }
  // ]

  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateteamComponent, {
      width: '400px',
      panelClass:"custom",
    });

    
  }

}
