import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // COMMENTED FOR DEV, UNCOMMENT ONCE DONE
    // if(localStorage.getItem('authenticated') != 'true') {
    //   this.router.navigateByUrl('/')
    // }
  }

}
