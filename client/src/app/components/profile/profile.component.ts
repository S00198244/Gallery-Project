import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName$!: Observable<string | null>;
  lastName$!: Observable<string | null>;

  name$!: string;

  constructor(private sessionQuery: SessionQuery) {

    this.firstName$ = this.sessionQuery.firstName$;
    this.lastName$ = this.sessionQuery.lastName$;

    this.name$ = this.sessionQuery.getName
  }

  ngOnInit(): void {

  }

}
