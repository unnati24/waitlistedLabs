import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

referralCode: string;
 user: string;
 size: number;
 position: number;

  constructor(
    private auth: UserAuthService,
    private firestre: AngularFirestore,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.referralCode = this.route.snapshot.params['token']
    this.user = this.route.snapshot.params['user']
    this.size = this.route.snapshot.params['size']
    this.position = Number(this.route.snapshot.params['position']) + 1

  }

  logout() {
    this.auth.logoutUser()
  }

}
