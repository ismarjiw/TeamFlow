import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../../modals/adduser/adduser.component';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/services/company/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userregistry',
  templateUrl: './userregistry.component.html',
  styleUrls: ['./userregistry.component.css']
})
export class UserregistryComponent {

  displayedColumns: string[] = ['name', 'email', 'active', 'admin', 'status'];

  isLoading = false;
  users$: Observable<any[]>

  constructor(private usersService: UsersService,
    public dialog: MatDialog,
    private route: ActivatedRoute
    ) {
      this.users$ = this.usersService.users$;
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const companyId = params['id']; // Assuming route parameter is named 'id'
      this.usersService.setCompanyId(companyId);
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '600px',
      panelClass:"custom",
    });

    dialogRef.componentInstance.userCreated.subscribe((newUser: Employee) => {
      // Optional: Display a confirmation message
      console.log('New user added:', newUser);

      // Optional: Perform additional logic

      // If you need to trigger any action after adding a new user,
      // you can do it here without explicitly fetching users again.
    });

  }
}
