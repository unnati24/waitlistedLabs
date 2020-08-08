import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  referral: string
  name: string;
  email: string;
  password: string;

  constructor(private auth: UserAuthService) { }

  ngOnInit() {
  }

  saveChanges(registerForm: NgForm) {
    if (registerForm.value.referral) this.referral = registerForm.value.referral
    else this.referral = ""

    this.auth.registerUser({
      username: registerForm.value.name,
      email: registerForm.value.email,
      password: registerForm.value.password,
      viaReferral: this.referral
    })
  }

}
