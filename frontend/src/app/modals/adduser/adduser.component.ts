import { UsersService } from '../../services/users/users.service';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Employee, UserProfile } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {

  // User creation form fields
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  isAdmin: string = 'false';

  @Output() userCreated = new EventEmitter<any>();
  addUserForm: FormGroup;

  users$: Observable<any[]>
  
  constructor(private fb: FormBuilder,
    private usersService: UsersService,
    public dialog: MatDialog) {
    this.addUserForm = this.fb.group({});
    this.users$ = this.usersService.users$;
  }

  ngOnInit() {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      isAdmin: ['false', Validators.required]
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const formValues = this.addUserForm.value;
      
      const credentials = {
        username: formValues.email, 
        password: formValues.password
      };

      const userProfile: UserProfile = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: formValues.phone
      };

      const newUser = {
        profile: userProfile,
        credentials,
        admin: formValues.isAdmin ? true : false,
        active: true, // Set to true by default for new users
        status: 'JOINED'  // Set to joined by default for new users
      };

      this.usersService.createUser$(newUser)
        .subscribe((user: Employee) => {
          this.userCreated.emit(user);
          console.log('User created after clicking submit: ', user);
          this.dialog.closeAll();
        });
    }
  }

}
