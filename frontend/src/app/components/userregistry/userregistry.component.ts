import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../../modals/adduser/adduser.component';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/services/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userregistry',
  templateUrl: './userregistry.component.html',
  styleUrls: ['./userregistry.component.css']
})
export class UserregistryComponent {

  companyId: number = -1
  displayedColumns: string[] = ['name', 'email', 'active', 'admin', 'status'];
  isLoading = true;
  users$: Observable<any[]>;
  admin: boolean = false;

  constructor(private usersService: UsersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.users$ = this.usersService.users$;
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.companyId = params['companyId']; 
      this.usersService.setCompanyId(this.companyId);
    });
    this.admin = localStorage.getItem('admin') === 'true'
    
    if(localStorage.getItem('authenticated') != 'true') {
      this.router.navigateByUrl('/')
    }

    if(!this.admin) {
      this.router.navigateByUrl('/')
    }

    this.users$.subscribe(() => {
      this.isLoading = false;
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      width: '600px',
      panelClass:"custom",
    });

    dialogRef.componentInstance.userCreated.subscribe((newUser: Employee) => {
      console.log('New user added:', newUser);
      this.users$ = this.usersService.updatedUsers$;
    });
  }

}
