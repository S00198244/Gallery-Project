// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { interval } from 'rxjs';

import { EventService } from './event.service';


describe('EventService', () => {
  let service: EventService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EventService);

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Return event when given an ID', () => {

    const eventID : string = '';

    service.getEventByID(eventID).subscribe(data => {
      expect(typeof data).toBe("ArtEvent")
    })
  });

});
