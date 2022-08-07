import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';
import { EventService } from 'src/app/services/event.service';
import { SessionQuery } from 'src/app/store/session.query';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email!: string | null;
  name!: string;
  bookings!: Booking[];
  profileForm!: FormGroup;

  constructor(private sessionQuery: SessionQuery, private eventService: EventService) {

    this.name = this.sessionQuery.getName;
    this.email = this.sessionQuery.email;
  }

  ngOnInit(): void {

    this.eventService.getBookingsByUserID().subscribe(res => this.bookings = res);

    this.profileForm = new FormGroup({
      email: new FormControl(this.email, Validators.required),
      password: new FormControl(null)
    });

  }

  formatDate(date: Date) {

    return moment(date).format("MMM Do YYYY"); 
  }

  showUpdateEmail() {

    console.log("In showUpdateEmail()");

    var emailForm = document.getElementById("staticEmail");

    emailForm?.removeAttribute('readonly');


    emailForm?.classList.remove("form-control-plaintext", "input-white");
    emailForm?.classList.add("form-control");

    emailForm?.classList.add("custom-input");


  } 


}
