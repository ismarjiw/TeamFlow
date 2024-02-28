import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Announcement, AnnouncementService } from 'src/app/services/announcement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {
  announcementForm: FormGroup;
  user: any
  companyId: number = -1;

  constructor(
    private announceService: AnnouncementService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder) {
    this.announcementForm = this.fb.group({})
  }

  ngOnInit() {
    // Create form
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Grab companyId from URL
    this.route.params.subscribe(params => {
      this.companyId = params['companyId']
    });

    // Get user from local storage for making announcements
    this.user = localStorage.getItem('user')
    if(this.user) {
      this.user = JSON.parse(this.user)
    }
  }


  onSubmit() {
    // Create a new announcement object
    const announcement: Announcement = {
      id: -1,
      date: "",
      title: this.announcementForm.controls['title'].value,
      message: this.announcementForm.controls['message'].value,
      author: this.user
    }

    // Pass obj to POST method and close modal
    this.announceService.createAnnouncement(this.companyId, announcement)
    .then(() => this.dialog.closeAll())
  }

}
