import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  @Output() createdProject = new EventEmitter<Project>()
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
  admin: boolean = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projectForm = this.fb.group({})
  }

  ngOnInit() {
    // Create form
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.companyId = this.data.companyId
    this.teamId = this.data.teamId

    this.admin = Boolean(localStorage.getItem('admin'))
    // TODO: implement once teamservice is merged
    // this.team = getTeam(this.teamId)
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
    .then((project) => {
      this.createdProject.emit(project)
      this.dialog.closeAll()
    })
  }
}


