import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebae from 'firebase/app';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = "Gallery";
  user: Observable<firebase.User>;
  routerlinks = [];

  constructor(
    private authService: AuthenticationService,
    private navService: NavigationService,
    private router: Router) {
    this.user = this.authService.authUser();
  }

  ngOnInit() {
    this.navService.navLinks.subscribe(data => this.routerlinks = data);
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
