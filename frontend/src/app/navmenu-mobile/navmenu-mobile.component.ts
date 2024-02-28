import { Component } from '@angular/core';

@Component({
  selector: 'app-navmenu-mobile',
  templateUrl: './navmenu-mobile.component.html',
  styleUrls: ['./navmenu-mobile.component.css']
})
export class NavmenuMobileComponent {
  menuShown: boolean = false

  toggleMenu() {
    this.menuShown = !this.menuShown
  }
}
