import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ArtEvent } from '../interfaces/art-event';
import { EventStore } from '../store/event.store';
import { EventQuery } from '../store/event.query';
import { Review } from '../interfaces/review';
import { SessionQuery } from '../store/session.query';
import { Booking } from '../interfaces/booking';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = environment.apiUrl;

  artEvent$!: ArtEvent | undefined;
  fullName!: string | null;
  userID!: string | null;

  constructor(private http: HttpClient, private eventStore: EventStore, private eventQuery: EventQuery, private sessionQuery: SessionQuery) { 

    this.eventQuery.artEvent$.subscribe(res => this.artEvent$ = res);

    this.sessionQuery.userID$.subscribe(res => this.userID = res);
    
    this.sessionQuery.name$.subscribe(res => this.fullName = res.firstName! + ' ' + res.lastName );

  }

    // Set active entity (Active (current) ArtEvent)

    setActive(id: string)
    {
      this.eventStore.setActive(id);
    }

    getEventByID(eventID: string): Observable<ArtEvent> {

      console.log("In getEventByID()");

      return this.http.get<ArtEvent>(`${this.url}/event/${eventID}`).pipe(catchError(this.handleError));
    }

    // getEvents() - Get all events

    getEvents(): Observable<ArtEvent[]> {

      console.log("getEvents service functions");

      return this.http.get<ArtEvent[]>(`${this.url}/events`).pipe(
        tap(event => {
          this.eventStore.loadEvents(event, true) // [event]
        }
      ),
      retry(1),
      catchError(this.handleError)
      );
    }

    // createEvent() - Create an event

    createEvent(event: ArtEvent): Observable<any> {

      console.log("In createEvent() | (event.service.ts)");

      return this.http.post<ArtEvent>(`${this.url}/events`, event).pipe(
        tap(event => {
          this.eventStore.add([event])
        }),
        retry(1),
        catchError(this.handleError)
      );
    }

    // updateEvent() - Update an event

    updateEvent(eventID: string, event: ArtEvent): Observable<ArtEvent> {

      console.log("In updateEvent() | (event.service.ts)");

      console.table(event);

      console.log(`${this.url}/event/${eventID}`);

      // 'https://localhost:8080/api/v1'

      return this.http.patch<ArtEvent>(`${this.url}/event/${eventID}`, event).pipe(
        tap(event => {
          this.eventStore.update(eventID, event)
        }),
        retry(1),
        catchError(this.handleError)
      );
    }

    // deleteEvent() - Delete an event

    deleteEvent(eventID: string): Observable<any> {

      console.log("In deleteEvent() | (event.service.ts)");

      return this.http.delete(`${this.url}/event/${eventID}`).pipe(
        tap(result => {
          this.eventStore.remove(eventID);
        }),
        retry(1),
        catchError(this.handleError)
      );
    }

    //__________________________________________________ Reviews

    // Get reviews

    getReviews() : Observable<Review[]> {

      console.log(`Retrieving reviews for Event: ${this.artEvent$?._id}`);

      return this.http.get<Review[]>(`${this.url}/event/${this.artEvent$?._id}}/reviews`).pipe(catchError(this.handleError));
    }

    // Add review

    addReview(review: Review) : Observable<Review>
    {
      console.log("In addReview()");

      console.log(review);

      const data = {
        rating: review.rating,
        review: review.review,
        userID: this.userID,
        userName: this.fullName
      }

      console.log(data);

      return this.http.post<Review>(`${this.url}/event/${this.artEvent$?._id}}/add_review`, data).pipe(catchError(this.handleError));
    }

    // Edit review

    editReview(id: string, review: Review) : Observable<Review> {

      console.log("In editReview()");

      return this.http.patch<Review>(`${this.url}/event/${this.artEvent$?._id}/review/${id}`, review).pipe(catchError(this.handleError));
    }

    // Delete review

    deleteReview(id: string) {
      
      console.log("In deleteReview()");

      return this.http.delete(`${this.url}/event/${this.artEvent$?._id}/review/${id}`).pipe(catchError(this.handleError));
    }

    // Delete reviews

    deleteReviews() {

      console.log("In deleteReviews()");

      return this.http.delete(`${this.url}/event/${this.artEvent$?._id}/reviews`).pipe(catchError(this.handleError));
    }

    //__________________________________________________ Bookings

    // Get bookings for a user

    getBookingsByUserID() : Observable<Booking[]> {

      console.log("In getBookingsByUserID()");

      return this.http.get<Booking[]>(`${this.url}/bookings/user/${this.userID}`).pipe(catchError(this.handleError));
    }

    // Get bookings for an event

    getBookingsByEventID(eventID: string) : Observable<Booking[]> {

      console.log("In getBookingsByEventID()");

      return this.http.get<Booking[]>(`${this.url}/bookings/event/${eventID}`).pipe(catchError(this.handleError));
    }

    // Add a booking

    addBooking(booking: any) {

      console.log("In addBooking()");

      return this.http.post(`${this.url}/bookings`, booking).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`
        );
      }
      // Return an observable with a user-facing error message.
      return throwError('Something bad happened; please try again later.');
    }
}
