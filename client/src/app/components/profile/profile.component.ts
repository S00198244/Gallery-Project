import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email!: string | null;
  name!: string;

  constructor(private sessionQuery: SessionQuery) {

    this.name = this.sessionQuery.getName;
    this.email = this.sessionQuery.email;
  }

  ngOnInit(): void {

  }

}
