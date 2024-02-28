import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { Announcement, AnnouncementService } from '../services/announcement.service';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private announceService: AnnouncementService) {}

  companyId: number = -1
  admin: boolean = false

  
  ngOnInit(): void {
    // COMMENTED FOR DEV, UNCOMMENT ONCE DONE
    // if(localStorage.getItem('authenticated') != 'true') {
    //   this.router.navigateByUrl('/')
    // }

    // Grab company id from URL
    // this.route.params.subscribe(params => {
    //   this.companyId = params['companyId']
    //   this.announceService.getAnnouncements(this.companyId)
    //   .then((announcements) => this.announcements = announcements)
    // });

    this.admin = Boolean(localStorage.getItem('admin'))
  }

  openCreateAnnouncement() {
    const dialogRef = this.dialog.open(CreateAnnouncementComponent)
   }

    // Mock announcements 
    announcements: Announcement[] = [{
      id: 1,
      date: "",
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus nisi nisi, vitae interdum quam imperdiet vitae. Donec et erat at dolor aliquam porta.',
      author: {
        profile: { firstname: 'Chris', lastname: 'Chris', email: 'asdf@asdf.asdf', phone: '123456789' }, isAdmin: true, active: true,
        status: ''
      }
    },
    {
      id: 2,
      date: "",
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus nisi nisi, vitae interdum quam imperdiet vitae. Donec et erat at dolor aliquam porta.',
      author: {
        profile: { firstname: 'James', lastname: 'Chris', email: 'asdf@asdf.asdf', phone: '123456789' }, isAdmin: true, active: true,
        status: ''
      }
    }]
}
