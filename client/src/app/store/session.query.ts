import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita'; 
import { SessionStore, SessionState } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

    accessToken$ = this.select((state) => state.accessToken);

    name$ = this.select(['firstName', 'lastName']);
    
    userID$ = this.select((state) => state._id);

    userId$ = this.getValue()._id;

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

  get isAdmin() {

    return this.getValue().admin;
  }
}