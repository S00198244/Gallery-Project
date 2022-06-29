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


  public artPieces: Art[] = [];

  eventArtPieces!: Art[] | undefined;

  constructor(private session: EventQuery, private eventService: EventService, private router: Router, private galleryService: GalleryService) {

    this.session.artEvent$.subscribe(res => this.artEvent$ = res)

    this.session.art$.subscribe(res => this.eventArtPieces = res)

   }

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
      art: new FormControl()
    })

  }

  updateEvent() {

    this.eventForm.controls['art'].setValue(this.eventArtPieces);

    console.log(this.eventForm.value);

    this.eventService.updateEvent(this.artEvent$!._id, this.eventForm.value).subscribe((res) => console.log(res));

    this.router.navigate(['/']);
  }

  clicked (artPiece: Art) {

    console.table(artPiece);

    this.selectedArtPiece = artPiece;
  }

  onSubmit()
  {
    
    this.artPieces = [];

    console.log(this.galleryForm.value.query);

    this.galleryService.getArtIds(this.galleryForm.value.query).subscribe({
      next: value => {
        this.artIds = value.objectIDs; // Returns an array of objectIDs that match the query
      },
      complete: () => {
        console.log('Retrieved objectIDs'),
        console.log(this.artIds);

        // retrieving information for each objectID (10)

        for (let i = 0; i < 10; i++) {

          this.galleryService.getArt(this.artIds[i]).subscribe({
            next: value => this.artPieces.push(value)
          })

        } 

      },
      error: (err) => this.message = err
    });
  }

  addArtPieceToEvent()
  {
    this.eventArtPieces?.push(this.selectedArtPiece);
  }

  // Deleting a comment

  deleteComment(commentID: string) {

    console.log("In deleteComment()");
    this.eventService.deleteComment(commentID).subscribe(res => console.log(res));
  }

  // Deleting a comment

  deleteComments() {

    console.log("In deleteComments()");
    this.eventService.deleteComments().subscribe(res => console.log(res));
  }
}
