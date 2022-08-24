// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySearchbarComponent } from './gallery-searchbar.component';

describe('GallerySearchbarComponent', () => {
  let component: GallerySearchbarComponent;
  let fixture: ComponentFixture<GallerySearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerySearchbarComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallerySearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
