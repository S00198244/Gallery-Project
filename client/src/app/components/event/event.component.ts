import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/store/event.query';
import { EventState } from 'src/app/store/event.store';
import { SessionQuery } from 'src/app/store/session.query';
import * as moment from 'moment';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  closeResult!: '';

  /*
  eventToBeUpdated: ArtEvent | any;
  isUpdateActivated = false;
  updateEventSub!: Subscription;
  */

  listEventSub!: Subscription;
  deleteEventSub!: Subscription;
  estate!: EventState;

  isAdmin$!: Observable<boolean | null>;

  artEvents$: Observable<ArtEvent[]> = this.artEventQuery.artEvents$;
  artEvents!: ArtEvent[];

  // dates!: Observable<string | null>
  dates: Date[] = [];

  eventForm!: FormGroup;
  bookingForm!: FormGroup;

  @ViewChild('btnClose')
  btnClose!: ElementRef;

  selectedArtEvent!: ArtEvent;

  constructor(private service: EventService, private router: Router, private artEventQuery: EventQuery, private sessionQuery: SessionQuery) {

    this.eventForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      summary: new FormControl(null, Validators.required)
    })

    this.bookingForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required)
    })

    this.isAdmin$ = this.sessionQuery.isAdmin$;
  }

  ngOnInit() {

    console.table(this.sessionQuery.userDetails$);

    console.log("Retrieving events...")

    this.listEventSub = this.artEventQuery.selectAreEventsLoaded$.pipe(
      filter(areEventsLoaded => !areEventsLoaded),
      switchMap(areEventsLoaded => {
        if (!areEventsLoaded) {
          return this.service.getEvents();
        } else return 'Could not retrieve events'
      })
    ).subscribe(result => {})

    //this.getEvents();

  }

  // getEvents() {

  //   this.service.getEvents().subscribe(res => console.log(res))
  // }

  ngOnDestroy() {

    if (this.listEventSub) {
      this.listEventSub.unsubscribe();
    }

    if (this.deleteEventSub) {
      this.deleteEventSub.unsubscribe();
    }

    /*
    if (this.updateEventSub) {
      this.updateEventSub.unsubscribe();
    }
    */
  }

  setActiveEvent(event: ArtEvent) {

    this.service.setActive(event._id);
    
  }

  goToEventDetails(event: ArtEvent) {

    this.setActiveEvent(event);

    this.router.navigate(['/eventDetails']);
  }

  // deleteEvent()

  deleteEvent(eventID: string) {
    this.deleteEventSub = this.service.deleteEvent(eventID).subscribe(result => {
      console.log(result);
    });
  }

  goToEditEvent(event: ArtEvent) {

    this.setActiveEvent(event);

    this.router.navigate(['/editEvent']);
  }

  clicked(event: ArtEvent) {

    this.selectedArtEvent = event;
    console.table(event);

    this.dates = this.getDates(event.startDate, event.endDate);

    
  }

  addEvent() {

    console.log('In addEvent()');

    console.log(this.eventForm.value);

    this.service.createEvent(this.eventForm.value).subscribe((res) => console.log(res));

    this.btnClose.nativeElement.click();

    this.eventForm.reset();
  }

  getDates(startDate: Date, endDate: Date) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    dates.push(currDate.clone().toDate());

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(currDate.clone().toDate());
    }

    dates.push(lastDate.clone().toDate())

    return dates;
  }

  bookEvent() {

    console.log(this.bookingForm.value);

    this.btnClose.nativeElement.click();

    this.bookingForm.reset();
  }
}
