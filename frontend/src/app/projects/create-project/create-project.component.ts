import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Announcement, AnnouncementService } from 'src/app/services/announcement.service';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  projectForm: FormGroup;
  user: any
  companyId: number = -1;
  teamId: number = -1;
  team: any = {
    name: "",
    description: "",
    users: [{
      profile: {firstname: "Adam", lastname: "Anderson",email:"email@email.com", phone: "12345678"},
      isAdmin: false,
      active: true,
      status: ""
    }]
  }

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder) {
    this.projectForm = this.fb.group({})
  }

  ngOnInit() {
    // Create form
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Grab companyId from URL
    this.route.params.subscribe(params => {
      this.companyId = params['companyId'],
      this.teamId = params['teamId']
    });

    // TODO: implement once teamservice is merged
    // this.team = getTeam()
  }


  onSubmit() {
    // Create a new Project object
    const project: Project = {
      id: -1,
      date: "",
      name: this.projectForm.controls['name'].value,
      description: this.projectForm.controls['description'].value,
      active: true,
      // TODO: Replace with get team once teamservice is merged
      team: this.team
    }

    // Pass obj to POST method and close modal
    this.projectService.createProject(this.companyId, this.teamId, project)
    .then(() => this.dialog.closeAll())
  }
}


