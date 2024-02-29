import { Component } from '@angular/core';
import { TeamsService } from '../../services/teams/teams.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateteamComponent } from '../../modals/createteam/createteam.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  teams: any[] = [];
  companyId: number = 6;
  admin: boolean = false;
  constructor(
    private teamsService: TeamsService,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router // to get the company ID from the route parameters
  ) { }

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

      if(localStorage.getItem('authenticated') != 'true') {
        this.router.navigateByUrl('/')
      }

      this.admin = localStorage.getItem('admin') === 'true'

      // Rest of your logic goes here based on the updated this.companyId
    });
    this.teams = this.teamsService.getCreatedTeams();
    this.teamsService.getTeamsByCompany(this.companyId).subscribe(
      (teams: any[]) => {
        this.teams = teams;
        for (const team of this.teams) {
          this.projectService.getProjects(this.companyId, team.id).then(
            (projects: any[]) => {
              team.numberofproject = projects.length;

            },
            error => {
              console.error('Error fetching projects:', error);
            }
          );
        }
        //             console.log(this.teams)
      },
      error => {
        console.error('Error fetching teams:', error);
      }
    );


  }

  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(CreateteamComponent, {
      width: '400px',
      panelClass: "custom",
      data: {companyId: this.companyId}
    } );
    dialogRef.componentInstance.teamCreated.subscribe((team) => {
      this.projectService.getProjects(this.companyId, team.id)
      .then((projects: any[]) => {team.numberofproject = projects.length;})
      this.teams.push(team)
    })
  }

}
