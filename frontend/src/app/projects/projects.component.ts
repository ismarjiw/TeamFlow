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
  projects: Map<number, Project> = new Map();

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
    this.route.params.subscribe(params => {
      this.companyId = params['cid']
      this.teamId = params['tid']
      this.projectService.getProjects(this.companyId, this.teamId)
      .then((projects) => projects.map((project) => this.projects.set(project.id, project)))
    });

    this.admin = localStorage.getItem('admin') === 'true'
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProjectComponent, {data: {companyId: this.companyId, teamId: this.teamId}})
    dialogRef.componentInstance.createdProject.subscribe((project) => this.projects.set(project.id, project))
  }

  
  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(EditProjectComponent, {data: {companyId: this.companyId, teamId: this.teamId, project: this.projects.get(id)}})
    dialogRef.componentInstance.editedProject.subscribe((project) => this.projects.set(project.id, project))
  }
}
