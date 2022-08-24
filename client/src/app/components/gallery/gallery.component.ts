import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Art } from 'src/app/interfaces/art';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public artPieces: Art[] = [];
  page: number = 1;
  totalLength: any;

  constructor() { }

  ngOnInit(): void {

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
}
