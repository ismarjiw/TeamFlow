import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectService } from '../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(private route: ActivatedRoute, private projectService: ProjectService, public dialog: MatDialog) {}

  companyId: number = -1
  teamId: number = -1
  admin: boolean = false
  team: any = {
    id: 1,
    name: "Team 1",
    description: "sdfasdf",
    users: []
  }

  ngOnInit(): void {
    // COMMENTED FOR DEV, UNCOMMENT ONCE DONE
    // if(localStorage.getItem('authenticated') != 'true') {
    //   this.router.navigateByUrl('/')
    // }

    // Grab company and team id from URL, then get projects
    // this.route.params.subscribe(params => {
    //   this.companyId = params['companyId']
    //   this.teamId = params['teamId']
    //   this.projectService.getProjects(this.companyId, this.teamId)
    //   .then((projects) => this.projects = projects)
    // });

    // this.admin = Boolean(localStorage.getItem('admin'))
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProjectComponent, {data: {companyId: this.companyId, teamId: this.teamId}})
  }

  
  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditProjectComponent, {data: {companyId: this.companyId, teamId: this.teamId, project: this.projects[id - 1]}})
  }

  // Mock projects
  projects: Project[] = [{
    id: 1,
    date: "",
		name: "Project 1",
		description: "Complete tasks on project 1",
		active: true,
		team: {
			name: "Team 1",
			description: "team 1, duh",
			users: [{
				profile: {firstname: "Adam", lastname: "Anderson",email:"email@email.com", phone: "12345678"},
				isAdmin: false,
				active: true,
				status: ""
			}]
		}
	}, 
  {
    id: 2,
    date: "",
		name: "Project 2",
		description: "Complete tasks on project 2",
		active: true,
		team: {
			name: "Team 2",
			description: "team 2, duh",
			users: [{
				profile: {firstname: "Adam", lastname: "Anderson",email:"email@email.com", phone: "12345678"},
				isAdmin: false,
				active: true,
				status: ""
			}]
		}
	}, 
  {
    id: 3,
    date: "",
		name: "Project 3",
		description: "Complete tasks on project 3",
		active: true,
		team: {
			name: "Team 3",
			description: "team 3, duh",
			users: [{
				profile: {firstname: "Adam", lastname: "Anderson",email:"email@email.com", phone: "12345678"},
				isAdmin: false,
				active: true,
				status: ""
			}]
		}
	}]
}
