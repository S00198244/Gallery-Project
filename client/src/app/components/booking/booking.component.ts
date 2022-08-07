import { Component, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { Booking } from 'src/app/interfaces/booking';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/store/event.query';
import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  // activeId$!: Observable<ID | null | undefined>
  artEvent$!: ArtEvent | undefined
  bookings!: Booking[];

  constructor(private query: EventQuery, private eventService: EventService) { 

    this.query.artEvent$.subscribe(res => this.artEvent$ = res);
  }

  ngOnInit(): void {

    // this.activeId$ = this.query.selectActiveId();

    // console.log(this.activeId$);

    console.log(this.artEvent$?.title);

    this.fetchBookings()
  }

  fetchBookings() {

    console.log("Fetching bookings...");

    console.log(this.artEvent$!._id);

    this.eventService.getBookingsByEventID(this.artEvent$!._id).subscribe((result: Booking[]) => this.bookings = result);

    console.table(this.bookings)
  }

  formatDate(date: Date) {

    return moment(date).format("MMM Do YYYY"); 
  }
}
