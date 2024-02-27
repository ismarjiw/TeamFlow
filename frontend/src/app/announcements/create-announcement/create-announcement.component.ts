import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent{
  @Output() x = new EventEmitter<any>();
  announcementForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder) {
      this.announcementForm = this.fb.group({})
    }

    ngOnInit() {
      this.announcementForm = this.fb.group({
        name: [''],
        description: [''],
        selectedMembers: [[]] 
      });
    }
}
