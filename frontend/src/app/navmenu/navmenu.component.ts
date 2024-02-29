import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {
  @Input() companyId: number = -1
  @Input() teamId: number = -1
  admin: boolean = false
  name: string | null = "";
  ngOnInit() {
    this.admin = localStorage.getItem('admin') === 'true'
    this.name = localStorage.getItem('name')
  }
}
