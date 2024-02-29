import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navmenu-mobile',
  templateUrl: './navmenu-mobile.component.html',
  styleUrls: ['./navmenu-mobile.component.css']
})
export class NavmenuMobileComponent {
  menuShown: boolean = false
  @Input() companyId: number = -1
  @Input() teamId: number = -1
  
  toggleMenu() {
    this.menuShown = !this.menuShown
  }
}
