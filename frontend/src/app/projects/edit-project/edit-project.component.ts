import { Component, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService, Project } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  projectForm: FormGroup;
  project: any
  @Output() editedProject = new EventEmitter<Project>()

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projectForm = this.fb.group({})
  }

  ngOnInit() {
    this.project = this.data.project
    // Create form
    this.projectForm = this.fb.group({
      name: [this.project.name, Validators.required],
      description: [this.project.description, Validators.required],
      active: [this.project.active]
    });
  }


  onSubmit() {
    // Create a new Project object
    const name = this.projectForm.controls['name'].value
    const description = this.projectForm.controls['description'].value
    const active = this.projectForm.controls['active'].value
    // Pass obj to POST method and close modal
    this.projectService.editProject(this.data.companyId, this.data.teamId, this.project.id, { name: name, description: description, active: active })
      .then((project) => {
        console.log(project)
        this.editedProject.emit(project);
        this.dialog.closeAll()
      })
  }
}
