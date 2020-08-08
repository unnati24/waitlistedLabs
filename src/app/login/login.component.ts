import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string
  password: string

  constructor(private auth: UserAuthService) { }

  ngOnInit() {
  }

  saveChanges(registerForm: NgForm) {
    this.auth.loginUser({
      username: null,
      email: registerForm.value.email,
      password: registerForm.value.password,
      viaReferral: null
    })
  }

}
