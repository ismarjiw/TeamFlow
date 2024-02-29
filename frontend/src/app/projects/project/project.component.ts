import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent {
  @Input() project: any
  @Output() openDialog = new EventEmitter<number>()

  dialogEvent() {
    this.openDialog.emit(this.project.id)
  }
}
