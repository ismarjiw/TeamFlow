import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  date: string = "";
  announceDate: number = 0;
  @Input() announcement: any = {}


  ngOnInit(){
    this.announceDate = Date.parse(this.announcement.date);
    let data = new Date(this.announceDate);
    this.date = data.toLocaleString('default', { month: 'long' }) + " " + data.getDate() + ", " + data.getFullYear();
  }

  convertDate(){
    this.date = this.announcement.date;
  }

}
