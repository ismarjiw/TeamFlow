import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  date: string = "";
  announceDate: Date = new Date();
  @Input() announcement: any = {}


  ngOnInit(){
    this.announceDate = this.announcement.date;
  }

  convertDate(){
    this.date = this.announcement.date;
  }

}
