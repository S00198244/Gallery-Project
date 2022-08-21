// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPaginationModule } from 'ngx-pagination';

import { EditEventComponent } from './edit-event.component';

describe('EditEventComponent', () => {
  let component: EditEventComponent,
    httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<EditEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, NgxPaginationModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
