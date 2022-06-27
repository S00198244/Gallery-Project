import { Component, OnInit } from '@angular/core';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit(): void {
    console.log(this.sessionQuery.userDetails$);
  }

}
