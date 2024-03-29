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
      localStorage.setItem('admin', JSON.stringify(user.admin))
      localStorage.setItem('cid', JSON.stringify(user.companies[0].id))
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('name', user.profile.firstName + " " + user.profile.lastName.charAt(0) + '.')
      localStorage.setItem('authenticated', 'true')
    })
    .then(() => {
      this.router.navigateByUrl('/companies')
    })
    .catch((err) => console.log(err))
  }
}
