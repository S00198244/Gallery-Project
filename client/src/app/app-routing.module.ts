import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventComponent } from './components/event/event.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { LogGuard } from './auth/log.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate:[LogGuard]},
  {path: 'signup', component: SignupComponent, canActivate:[LogGuard]},
  {path: 'events', component: EventComponent},
  {path: 'eventDetails', component: EventDetailsComponent},
  {path: 'editEvent', component: EditEventComponent, canActivate:[AuthGuard]},
  {path: 'gallery', component: GalleryComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'booking', component: BookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Restore the last scroll position
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    // Enable scrolling to anchors
    anchorScrolling: "enabled",
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
