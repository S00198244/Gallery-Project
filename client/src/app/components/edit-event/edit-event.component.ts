import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Art } from 'src/app/interfaces/art';
import { ArtEvent } from 'src/app/interfaces/art-event';
import { EventService } from 'src/app/services/event.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { EventQuery } from 'src/app/store/event.query';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  artEvent$!: ArtEvent | undefined;

  eventForm!: FormGroup;

  artIds!: number[];

  message: string = "";

  selectedArtPiece!: Art;

  galleryForm!: FormGroup;

  startDate!: any;
  endDate!: any;

  public artPieces: Art[] = [];

  eventArtPieces: Art[] = [];

  constructor(private session: EventQuery, private eventService: EventService, private router: Router, private galleryService: GalleryService) {

    this.session.artEvent$.subscribe(res => this.artEvent$ = res)

   }

  totalLength: any;
  page: number = 1;

  ngOnInit(): void {

    console.log(this.artEvent$);

    this.eventDataInitialiser();

    this.galleryForm = new FormGroup({
      query: new FormControl([''], Validators.required)
    })
  }

  eventDataInitialiser() {

    this.eventForm = new FormGroup({
      title: new FormControl(this.artEvent$?.title, Validators.required),
      summary: new FormControl(this.artEvent$?.summary),
      startDate: new FormControl(this.artEvent$?.startDate),
      endDate: new FormControl(this.artEvent$?.endDate),
      art: new FormControl()
    })

    this.artEvent$?.art.forEach(element => {
      this.eventArtPieces.push(element)
    });

  }

  setArtPieces(art: Art[]) {

    this.artPieces = art;
  }

  setPage(page: number) {

    this.page = page;
  }

  setTotalLength(totalLength: number) {

    this.totalLength = totalLength;
  }

  updateEvent() {

    this.eventForm.controls['art'].setValue(this.eventArtPieces);
    this.eventForm.controls['startDate'].setValue(this.startDate);
    this.eventForm.controls['endDate'].setValue(this.endDate);

    console.log(this.eventForm.value);

    this.eventService.updateEvent(this.artEvent$!._id, this.eventForm.value).subscribe((res) => console.log(res));

    this.router.navigate(['/events']);
  }

  clicked (artPiece: Art) {

    console.table(artPiece);

    this.selectedArtPiece = artPiece;
  }

  addArtPieceToEvent()
  {
    this.eventArtPieces?.push(this.selectedArtPiece);
  }

  removeArtPieceFromEvent(artPiece: Art)
  {
    for (let index = 0; index < this.eventArtPieces.length; index++) {
      
      if (this.eventArtPieces[index].objectID == artPiece.objectID)
      {
        this.eventArtPieces.splice(index, 1)
      }
    }
  }

  // Deleting a review

  deleteReview(commentID: string) {

    console.log("In deleteReview()");
    this.eventService.deleteReview(commentID).subscribe(res => console.log(res));
  }

  // Deleting reviews

  deleteReviews() {

    console.log("In deleteReviews()");
    this.eventService.deleteReviews().subscribe(res => console.log(res));
  }

  updateStartDate(event: any) {

    console.log(event.target.value);

    this.startDate = new Date(event.target.value);
  }

  updateEndDate(event: any) {

    console.log(event.target.value);

    this.endDate = new Date(event.target.value);
  }

  // getDatesInRange() {

  //   const date = this.startDate;

  //   while (date <= this.endDate) {

  //     var d = new Date(date);

  //     this.dates.push(d);

  //     date.setDate(date.getDate() + 1);

  //   }
  
  //   this.dates.forEach(element => {
  //     console.log(element);
  //   });
  // }
}
