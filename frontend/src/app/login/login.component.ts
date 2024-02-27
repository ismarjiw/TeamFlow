import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.pattern('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}'), Validators.maxLength(30), Validators.minLength(6)]),
    password: new FormControl<string>('', [Validators.minLength(6)])
  })

  email = this.loginForm.controls['email']
  password = this.loginForm.controls['password']

  ngOnInit(): void {
    // FOR TESTING, REMOVE ONCE AUTHENTICATION WORKS
    localStorage.setItem('authenticated', 'true')
  }
  
  signIn = () => {
    this.loginService.authenticate(this.email.value, this.password.value)
  }
}
