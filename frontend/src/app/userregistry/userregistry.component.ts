import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserEntry, AdduserComponent } from '../adduser/adduser.component';
import { take } from 'rxjs';

export interface UserEntry {
  name: string;
  email: string;
  active: string;
  admin: string;
  status: string;
}
// change interface to include user id later from backend -> modify as needed in UsersService -> this was just for test purposes 

const USER_DATA: UserEntry[] = [
  {name: 'ismarji', email: 'me@gmail.com', active: 'YES', admin: 'YES', status: 'JOINED'},
  {name: 'sherry', email: 'sherry@gmail.com', active: 'YES', admin: 'YES', status: 'JOINED'},
  {name: 'wolfy', email: 'wolfy@gmail.com', active: 'YES', admin: 'YES', status: 'JOINED'},
  {name: 'matthew', email: 'matthew@gmail.com', active: 'YES', admin: 'YES', status: 'JOINED'},
];

@Component({
  selector: 'app-userregistry',
  templateUrl: './userregistry.component.html',
  styleUrls: ['./userregistry.component.css']
})
export class UserregistryComponent {

  displayedColumns: string[] = ['name', 'email', 'active', 'admin', 'status'];
  dataSource = USER_DATA; // initial test data -> replace [dataSource] with "dataSource" in table to see

  users: any[] = []; 
  isLoading = false;

  constructor(private usersService: UsersService,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.usersService.getCreatedUsers();
    console.log('Users array when page loads: ', this.users);
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '600px',
      panelClass:"custom",
    });

    dialogRef.componentInstance.userCreated.subscribe((newUser: UserEntry) => {
      this.loadUsers(); 
    });

  }
}
