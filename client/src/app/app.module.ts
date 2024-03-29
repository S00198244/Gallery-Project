import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EventComponent } from './components/event/event.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';

import { AuthGuard } from './auth/auth.guard';

import {NgxPaginationModule} from 'ngx-pagination';

import { ProfileComponent } from './components/profile/profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { GallerySearchbarComponent } from './components/gallery-searchbar/gallery-searchbar.component';
import { BookingListComponent } from './components/booking-list/booking-list.component'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EventComponent,
    HeaderComponent,
    FooterComponent,
    EventDetailsComponent,
    GalleryComponent,
    EditEventComponent,
    ProfileComponent,
    BookingComponent,
    GallerySearchbarComponent,
    BookingListComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
