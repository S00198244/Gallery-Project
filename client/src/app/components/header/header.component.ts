import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userID$!: Observable<string | null>;

  constructor(private sessionQuery: SessionQuery, private authService: AuthService) {

    this.userID$ = this.sessionQuery.userID$;

  }

  ngOnInit(): void {
  }

  logout() {

    this.authService.logout();

  }
}
