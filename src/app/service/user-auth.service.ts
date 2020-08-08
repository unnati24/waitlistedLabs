import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private subscription: Subscription[] = [];
  private size: number
  private position: any
  private authdata: AuthData

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private database: AngularFirestore) { }

  registerUser(authData: AuthData) {
    this.fireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        if (authData.viaReferral.length === 0) {
          this.authdata = {
            username: authData.username,
            email: authData.email,
            points: 0,
            created_at: new Date()
          }
        } else {
          this.authdata = {
            username: authData.username,
            email: authData.email,
            viaReferral: authData.viaReferral,
            referralCode: result.user.uid,
            points: 10,
            created_at: new Date()

          }
        }

        this.database.collection("users").doc(result.user.uid).set(this.authdata)
        if (authData.viaReferral.length !== 0) this.updateReferralPoints(authData.viaReferral)
        else this.router.navigate(['home'])
        this.cancelSubscription()

      })
      .catch(error => {
        alert(error)
      })
  }

  loginUser(authData: AuthData) {
    this.fireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.subscription.push(this.database.collection('users').doc(result.user.uid)
          .valueChanges()
          .subscribe(res => {
            this.getPosition(res, result.user.uid)
          }))
      })
      .catch(error => {
        alert(error)
      })
  }

  logoutUser() {
    this.fireAuth.auth.signOut();
    this.router.navigate(['home']);
    this.cancelSubscription()
  }

  updateReferralPoints(docId: string) {

    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(20);
    const userRef = db.collection('users').doc(docId);
    userRef.update({ points: increment });
    this.router.navigate(['home'])

  }

  getPosition(res: any, uid: string) {
    this.subscription.push(this.database.collection('users', ref => ref.orderBy("points", "desc")).snapshotChanges()
      .subscribe(
        results => results.map((ele, index) => {
          if (ele.payload.doc.data()['email'] === res['email']) {
            this.position = index
            this.size = results.length
            this.router.navigate(['welcome', uid, this.size, res['username'], this.position])
          }
        })
      ))
  }

  cancelSubscription() {
    this.subscription.forEach(sub => sub.unsubscribe())
  }
}


export class AuthData {
  username: string;
  email: string;
  password?: string;
  viaReferral?: string;
  referralCode?: string;
  points?: number;
  created_at?: Date;

}







