import { Component } from '@angular/core';
import { TeamsService } from '../../services/teams/teams.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateteamComponent } from '../../modals/createteam/createteam.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  teams: any[] = [];
companyId: number = 6;
  constructor(
    private teamsService: TeamsService,
    public dialog: MatDialog,
    private route: ActivatedRoute // to get the company ID from the route parameters
    ) {}

//      ngOnInit() {
//         this.teams = this.teamsService.getCreatedTeams();
//         // Assuming TeamsService has a method to fetch teams from the endpoint
//         this.teamsService.getTeamsByCompany(6).subscribe(
//           (teams: any[]) => {
//             this.teams = teams;
//           },
//           error => {
//             console.error('Error fetching teams:', error);
//           }
//         );
//       }
ngOnInit() {
    if (!this.companyId) {
        // If not set, initialize it to a default value
        this.companyId = 6;
      }

      // Subscribe to route parameters
      this.route.params.subscribe(params => {
        // Update this.companyId with the value from params['cid']
        // if it is provided in the route parameters
        if (params['cid']) {
          this.companyId = +params['cid']; // Convert to number if needed
        }

        // Rest of your logic goes here based on the updated this.companyId
      });
    this.teams = this.teamsService.getCreatedTeams();
    this.teamsService.getTeamsByCompany(this.companyId).subscribe(
      (teams: any[]) => {
        this.teams = teams;
      },
      error => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateteamComponent, {
      width: '400px',
      panelClass:"custom",
    });


  }

}

//***/ to get the company specific teams array \***\\
      // this.route.params.subscribe(params => {
      //   const companyId = +params['companyId']; // Assuming companyId is a number
      //   // Fetch teams associated with the company
      //   this.teamsService.getTeamsByCompany(companyId).subscribe(teams => {
      //     this.teams = teams;
      //   });
      // });

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
