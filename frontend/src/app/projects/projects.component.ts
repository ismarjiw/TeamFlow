import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  companyId: number = -1
  teamId: number = -1
  admin: boolean = false
  projects: any = []
  ngOnInit(): void {
    // COMMENTED FOR DEV, UNCOMMENT ONCE DONE
    // if(localStorage.getItem('authenticated') != 'true') {
    //   this.router.navigateByUrl('/')
    // }

    // Grab company and team id from URL, then get projects
    this.route.params.subscribe(params => {
      this.companyId = params['companyId']
      this.teamId = params['teamId']
      this.projects = this.projectService.getProjects(this.companyId, this.teamId)
    });

    this.admin = Boolean(localStorage.getItem('admin'))
  }
}
