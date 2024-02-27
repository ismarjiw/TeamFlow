import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}

  // Mock announcements 
  announcements = [{
    id: 1,
    date: 1,
    title: '',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus nisi nisi, vitae interdum quam imperdiet vitae. Donec et erat at dolor aliquam porta.',
    author: {profile: {firstname:'Chris', lastname:'Chris', email:'asdf@asdf.asdf', phone:'123456789', isAdmin: true, active:true}}
  },
  {
    id: 2,
    date: 1,
    title: '',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus nisi nisi, vitae interdum quam imperdiet vitae. Donec et erat at dolor aliquam porta.',
    author: {profile: {firstname:'James', lastname:'Chris', email:'asdf@asdf.asdf', phone:'123456789', isAdmin: true, active:true}}
  }]
  
  ngOnInit(): void {
    // COMMENTED FOR DEV, UNCOMMENT ONCE DONE
    // if(localStorage.getItem('authenticated') != 'true') {
    //   this.router.navigateByUrl('/')
    // }
  }

  openCreateAnnouncement() {
    const dialogRef = this.dialog.open(CreateAnnouncementComponent)
   }
   
}
