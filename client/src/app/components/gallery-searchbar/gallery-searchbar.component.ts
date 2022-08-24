import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Art } from 'src/app/interfaces/art';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery-searchbar',
  templateUrl: './gallery-searchbar.component.html',
  styleUrls: ['./gallery-searchbar.component.css']
})
export class GallerySearchbarComponent implements OnInit {
  @Output() artPieces = new EventEmitter<Art[]>();
  @Output() page = new EventEmitter<number>();
  @Output() totalLength = new EventEmitter<any>();

  artIds!: number[];

  // public artPieces: Art[] = [];

  public tempArtPieces: Art[] = [];

  message: string = "";

  galleryForm!: FormGroup;

  // totalLength: any;
  // page: number = 1;

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {

    this.galleryForm = new FormGroup({
      query: new FormControl([''], Validators.required)
    })

  }

  onSubmit() {

    this.page.emit(1);

    this.artPieces.emit([]);

    this.tempArtPieces = [];
    var count = 0;

    console.log(this.galleryForm.value.query);

    this.galleryService.getArtIds(this.galleryForm.value.query).subscribe({
      next: value => {
        this.artIds = value.objectIDs; // Returns an array of objectIDs that match the query
      },
      complete: () => {
        console.log('Retrieved objectIDs'),
        console.log(this.artIds);

        // retrieving information for each objectID (10)

        // for (let i = 0; i < 10; i++) {

        this.artIds.forEach(number => {

          if(count < 15)
          {
            console.log(number);

            this.galleryService.getArt(number).subscribe({
              next: value => { 
                if (value.primaryImageSmall != "") 
                { 
                  this.tempArtPieces.push(value)
                }
              }
            })

            count++;
          }
          else {
            return;
          }
          
          
        });
      },
      error: (err) => this.message = err
    });

    this.artPieces.emit(this.tempArtPieces);
    this.totalLength.emit(this.tempArtPieces.length);
  }

}
