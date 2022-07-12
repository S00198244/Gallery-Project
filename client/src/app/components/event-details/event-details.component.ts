import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arrayAdd, arrayRemove, arrayUpdate } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Art } from 'src/app/interfaces/art';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { Review } from 'src/app/interfaces/review';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/store/event.query';
import { EventStore } from 'src/app/store/event.store';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  artEvent$!: ArtEvent | undefined;
  eventArtPieces!: Art[] | undefined;

  userID$!: string | null;

  reviews!: Review[];

  selectedReview!: Review;

  reviewForm!: FormGroup;

  // showForm!: boolean;



  constructor(private sessionQuery: SessionQuery, private eventQuery: EventQuery, private eventStore: EventStore, private eventService: EventService) {

  this.eventQuery.artEvent$.subscribe(res => this.artEvent$ = res);
  this.eventQuery.art$.subscribe(res => this.eventArtPieces = res);

  this.sessionQuery.userID$.subscribe(res => this.userID$ = res);

  }
 
  ngOnInit(): void { 

    this.reviewForm = new FormGroup({
      review: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required)
    });

    console.log(this.artEvent$);

    this.getReviews();

  }

  clicked(review: Review) {

    console.table(review);

    this.selectedReview = review;
  }

  showEditReviewForm() {

  }

  // showCommentForm() {

  //   if (this.showForm == true) // If true set to false
  //   {
  //     this.showForm = false
  //   }
  //   else
  //     this.showForm = true

  //   console.log(this.showForm);
  // }

  // Get reviews

  getReviews() {

    console.log("getReviews()");

    this.eventService.getReviews().subscribe(res => this.reviews = res);
  }

  // Adding a review

  addReview() {

    console.log('In addReview()');

    console.log(this.reviewForm.value);

    this.eventService.addReview(this.reviewForm.value).subscribe(res => this.reviews.push(res));
  }

  // Deleting a review

  deleteReview(review: Review) {

    if(this.userID$ == review.userID)
    {
      console.log("In deleteReview()");

      this.eventService.deleteReview(review._id).subscribe((res) => {
        console.log(res);


        for (let index = 0; index < this.reviews.length; index++) {
          if (this.reviews[index]._id == review._id)
          {
            this.reviews.splice(index, 1)
          }
        }
      });
    }
    else
    {
      return;
    } 
  }

  // Edit (update) a review

  editReview(reviewID: string) {

    if(this.userID$ == this.selectedReview.userID)
    {
    console.log("In editReview()");

    this.eventService.editReview(reviewID, this.reviewForm.value.review).subscribe(res => console.log(res));

    this.getReviews();
    }
    else 
      return;
  }

  setRating(rating: number) {

    this.reviewForm.controls['rating'].setValue(rating);
  }

  rating(i: number) {
    return new Array(i)
  }
}
