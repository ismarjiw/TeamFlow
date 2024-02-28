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

  companyId: number = 6
  admin: boolean = false

  
  ngOnInit(): void {
    // COMMENTED FOR DEV, UNCOMMENT ONCE DONE
    if(localStorage.getItem('authenticated') != 'true') {
      this.router.navigateByUrl('/')
    }

    // Grab company id from URL
    this.route.params.subscribe(params => {
      this.companyId = 6
      this.announceService.getAnnouncements(this.companyId)
      .then((announcements) => this.announcements = this.convertToArray(announcements))
    });

    this.admin = Boolean(localStorage.getItem('admin'))
  }

  convertToArray(a: Set<Announcement>){
    let announce = []; 
    for( let b of a){
      announce.push(b);
    }

    announce.sort((a,b) => b.id >= a.id ? 1 : -1)

    return announce;

  }

  openCreateAnnouncement() {
    const dialogRef = this.dialog.open(CreateAnnouncementComponent)
    dialogRef.componentInstance.createdAnnoucement.subscribe((announcment) => {this.announcements.push(announcment);this.announcements.sort((a,b) => b.id >= a.id ? 1 : -1);});
   }

    // Mock announcements 
    announcements: Announcement[] = [{
      id: 1,
      date: "February 28, 2024",
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus nisi nisi, vitae interdum quam imperdiet vitae. Donec et erat at dolor aliquam porta.',
      author: {
        profile: { firstName: 'Chris', lastName: 'Chris', email: 'asdf@asdf.asdf', phone: '123456789' }, isAdmin: true, active: true,
        status: ''
      }
    },
    {
      id: 2,
      date: "February 25, 2024",
      title: '',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus nisi nisi, vitae interdum quam imperdiet vitae. Donec et erat at dolor aliquam porta.',
      author: {
        profile: { firstName: 'James', lastName: 'Chris', email: 'asdf@asdf.asdf', phone: '123456789' }, isAdmin: true, active: true,
        status: ''
      }
    }]
}
