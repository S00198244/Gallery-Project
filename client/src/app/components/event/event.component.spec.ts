// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventComponent,
    httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
