import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private database: AngularFirestore,
    private router: Router) { }

  submitFeedback(data: FeedbackModel) {
    this.addDataToDataBase({
      name: data.name,
      email: data.email,
      feedback: data.feedback
    })
    this.router.navigate(['home'])
  }

  private addDataToDataBase(feedback: FeedbackModel) {
    this.database.collection('feedbacks').add(feedback);
  }
}


export class FeedbackModel {
  name: string;
  email: string;
  feedback: string;
}
