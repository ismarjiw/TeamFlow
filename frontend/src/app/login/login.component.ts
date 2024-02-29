import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {
  }

  loginForm: FormGroup = new FormGroup({
    // Validates that email follows example@example.com pattern
    email: new FormControl<string>('', [Validators.pattern('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}'), Validators.maxLength(30), Validators.minLength(6), Validators.required]),
    password: new FormControl<string>('', [Validators.minLength(6), Validators.required])
  })

  email = this.loginForm.controls['email']
  password = this.loginForm.controls['password']
  admin: boolean = false

  ngOnInit(): void {
    // FOR TESTING, REMOVE ONCE AUTHENTICATION WORKS
    localStorage.setItem('admin', 'true')

    // Logout user when routing to login page
    localStorage.clear()
  }

  signIn = () => {
    if(this.email.errors || this.password.errors) {
      alert("email or password contains errors")
      return
    }
    this.loginService.authenticate(this.email.value, this.password.value)
    .then((user: any) => {
      console.log(user);
      // Store user data and whether admin privileges are active in localstorage
      localStorage.setItem('admin', user.admin.toString())
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('authenticated', 'true')
    })
    .then(() => {
      // Waiting to implement this. Should they go to select company no matter what?
      // if (this.admin) {
      //   this.router.navigateByUrl('/company')
      // } else {
      //   this.router.navigateByUrl('/company/6/teams/11/projects')
      // }
//       this.router.navigateByUrl('/company/6/teams/11/projects')
this.router.navigateByUrl(`/company/6/teams`)
    })
    .catch((err) => console.log(err))
  }
}
