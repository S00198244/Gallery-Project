import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';
import { EventService } from 'src/app/services/event.service';
import { SessionQuery } from 'src/app/store/session.query';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AnyFn } from '@ngrx/store/src/selector';

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

  emailFormCount: number = 0;

  constructor(private sessionQuery: SessionQuery, private authService: AuthService, private eventService: EventService) {

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

    var emailForm = document.getElementById("staticEmail");

    if (this.emailFormCount == 0)
    {
      console.log("In showUpdateEmail()");

      emailForm?.removeAttribute('readonly');
      emailForm?.classList.remove("form-control-plaintext", "input-white");
      emailForm?.classList.add("form-control", "custom-input");

      this.emailFormCount++;

    } else if (this.emailFormCount > 0) {

      emailForm?.setAttribute('readonly', 'readonly');
      emailForm?.classList.add("form-control-plaintext", "input-white");
      emailForm?.classList.remove("form-control", "custom-input");

      console.log(this.emailFormCount);

      this.emailFormCount = 0;

      console.log(this.profileForm.controls['email'].value);

      this.authService.updateEmail(this.profileForm.controls['email'].value).subscribe((res: any) => this.email = res);
    
      
    }
  } 
}
