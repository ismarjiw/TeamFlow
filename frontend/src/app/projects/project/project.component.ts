import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent {
  @Input() project: Project = {
    id: 1,
    date: "",
    name: '',
    description: '',
    active: false,
    team: {
      name: '',
      description: '',
      users: [null]
    }
  }

  @Output() openDialog = new EventEmitter<any>()

  dialogEvent() {
    this.openDialog.emit()
  }
}
