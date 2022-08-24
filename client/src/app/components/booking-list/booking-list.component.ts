import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Booking } from 'src/app/interfaces/booking';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  @Input() bookings : Booking[] = [];
  @Input() guestList = false;

  constructor() { }

  ngOnInit(): void {

  }

  formatDate(date: Date) {

    return moment(date).format("MMM Do YYYY"); 
  }

}
