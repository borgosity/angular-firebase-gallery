import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebae from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = "Gallery";
  user: Observable<firebase.User>;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.authUser();
  }

  isGeneral(): boolean {
    return this.authService.canView();
  }

  isSubscriber(): boolean {
    return this.authService.canSubmit();
  }

  isAdmin() {
    return this.authService.canUpload();
  }

  logOut() {
    this.authService.logout().then(onResolve => this.router.navigate['/']);
  }
}
