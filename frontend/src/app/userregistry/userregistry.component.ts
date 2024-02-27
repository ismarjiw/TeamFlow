import { Component } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserEntry, AdduserComponent } from '../adduser/adduser.component';

export interface UserEntry {
  name: string;
  email: string;
  active: string;
  admin: string;
  status: string;
}

// change interface to include user id later from backend -> modify as needed in UsersService 

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
  dataSource = USER_DATA;

  users: UserEntry[] = []; // will load users array in html once can grab data from backend 
  isLoading = false;

  constructor(private usersService: UsersService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.usersService.getCreatedUsers()
  .subscribe(users => {
    this.users = users;
    console.log(this.users);
  });

    // this.isLoading = true;
    // this.usersService.getAllUsers().subscribe((users: UserEntry[]) => {
    //   this.users = users;
    //   this.isLoading = false; 
    // });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AdduserComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Check if a new user was created
      if (result) {
        console.log(result);
        console.log(this.users);
      }
    });
  }
}
