import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  name: string
  email: string
  message: string

  constructor(
    private service: UserDataService,
  ) { }

  ngOnInit() {
  }

  onSend(data: NgForm) {
    this.service.submitFeedback({
      name: data.value.name,
      email: data.value.email,
      feedback: data.value.message
    })
  }

}
