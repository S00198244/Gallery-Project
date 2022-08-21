// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GalleryService);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
