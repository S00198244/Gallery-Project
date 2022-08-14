import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'; 
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

    accessToken$ = this.select((state) => state.accessToken);

    name$ = this.select(['firstName', 'lastName']);
    // firstName$ = this.select((state) => state.firstName); 
    // lastName$ = this.select((state) => state.lastName);

    userID$ = this.select((state) => state._id);

    userID = this.getValue()._id;
    firstName = this.getValue().firstName;
    lastName = this.getValue().lastName;
    email = this.getValue().email;

    //$userDetails = this.select(['userID','firstName','lastName','email','accessToken']);
    
    userDetails$ = this.getValue();

    // added override
  constructor(protected override store: SessionStore) {
    super(store);
  }

  // Returns boolean value

  get isLoggedIn() {

    return !!this.getValue().accessToken;
  }

  get isLoggedIn$() {

    return this.select((state) => state._id);
  }

  get isAdmin$() {

    //return this.getValue().admin;

    return this.select((state) => state.admin)
  }

  get isAdmin() {

    return this.getValue().admin;
  }

  get getName() {

    return `${this.getValue().firstName} ${this.getValue().lastName}`

  }
}